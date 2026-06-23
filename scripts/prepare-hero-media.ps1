# Bereitet das Hero-Video für R2 vor: komprimiert MP4, baut WebM und Poster.
# Voraussetzung: ffmpeg im PATH (einmalig: winget install Gyan.FFmpeg).
#
# Aufruf:
#   .\scripts\prepare-hero-media.ps1 [-Source <pfad-zu-source.mp4>] [-OutDir <ordner>]
#
# Standard:
#   Source = Videos\aerial-view-of-austrian-mountain-range-in-vorarlbe-*.mp4
#   OutDir = Videos\hero-out
#
# Ergebnis (im OutDir):
#   hero.mp4         (H.264, ~8-15 MB, 1080p, ohne Audio, faststart)
#   hero.webm        (VP9, ~5-10 MB)
#   hero-poster.jpg  (~100-200 KB)
#
# Danach: alle drei Dateien in den R2-Bucket hochladen (Root). Cache-Control:
#   public, max-age=31536000, immutable

param(
  [string]$Source = "",
  [string]$OutDir = "",
  [int]$DurationSec = 20,
  [int]$Crf = 28
)

$ErrorActionPreference = "Stop"
$projectRoot = Split-Path $PSScriptRoot -Parent

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "ffmpeg nicht gefunden. Bitte installieren:" -ForegroundColor Yellow
  Write-Host "  winget install Gyan.FFmpeg" -ForegroundColor Cyan
  Write-Host "Dann ein neues Terminal öffnen und erneut ausführen."
  exit 1
}

if (-not $Source) {
  $videosDir = Join-Path $projectRoot "Videos"
  if (-not (Test-Path $videosDir)) {
    Write-Host "Kein Videos-Ordner unter $videosDir" -ForegroundColor Red
    exit 1
  }
  $candidate = Get-ChildItem -Path $videosDir -File -Filter "*.mp4" |
    Where-Object { $_.Name -match "aerial|austrian|vorarl|hero" } |
    Sort-Object Length -Descending |
    Select-Object -First 1
  if (-not $candidate) {
    $candidate = Get-ChildItem -Path $videosDir -File -Filter "*.mp4" |
      Sort-Object Length -Descending | Select-Object -First 1
  }
  if (-not $candidate) {
    Write-Host "Kein MP4 in $videosDir gefunden." -ForegroundColor Red
    exit 1
  }
  $Source = $candidate.FullName
}

if (-not (Test-Path $Source)) {
  Write-Host "Quelldatei nicht gefunden: $Source" -ForegroundColor Red
  exit 1
}

if (-not $OutDir) {
  $OutDir = Join-Path $projectRoot "Videos\hero-out"
}
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$mp4  = Join-Path $OutDir "hero.mp4"
$webm = Join-Path $OutDir "hero.webm"
$jpg  = Join-Path $OutDir "hero-poster.jpg"

Write-Host "Source : $Source"
Write-Host "Out    : $OutDir"
Write-Host "Length : ${DurationSec}s  ·  CRF: $Crf"
Write-Host ""

Write-Host "[1/3] H.264 MP4 (Hauptdatei)..." -ForegroundColor Cyan
ffmpeg -y -hide_banner -loglevel error -stats `
  -i "$Source" `
  -t $DurationSec `
  -c:v libx264 -crf $Crf -preset slow -profile:v high -level 4.0 -pix_fmt yuv420p `
  -an `
  -vf "scale=1920:-2" `
  -movflags +faststart `
  "$mp4"

Write-Host "[2/3] VP9 WebM (kleiner, moderne Browser)..." -ForegroundColor Cyan
ffmpeg -y -hide_banner -loglevel error -stats `
  -i "$Source" `
  -t $DurationSec `
  -c:v libvpx-vp9 -crf 35 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 `
  -an `
  -vf "scale=1920:-2" `
  "$webm"

Write-Host "[3/3] Poster JPG (2s ins Video)..." -ForegroundColor Cyan
ffmpeg -y -hide_banner -loglevel error `
  -ss 00:00:02 -i "$Source" `
  -vframes 1 -q:v 4 `
  -vf "scale=1920:-2" `
  "$jpg"

Write-Host ""
Write-Host "Fertig:" -ForegroundColor Green
Get-ChildItem -Path $OutDir | Where-Object { $_.Name -match "^hero" } |
  Sort-Object Name | ForEach-Object {
    $sizeMb = [Math]::Round($_.Length / 1MB, 2)
    Write-Host ("  {0,-22} {1,8} MB" -f $_.Name, $sizeMb)
  }

Write-Host ""
Write-Host "Nächste Schritte:" -ForegroundColor Yellow
Write-Host "  1) Diese 3 Dateien in den R2-Bucket hochladen (Root)."
Write-Host "  2) Cache-Control setzen: public, max-age=31536000, immutable"
Write-Host "  3) NEXT_PUBLIC_MEDIA_BASE_URL auf die Custom-Domain setzen,"
Write-Host "     z. B. https://cdn.lavik-media.com  (lokal: .env.local;"
Write-Host "     Produktion: Cloudflare Worker Variables)."

exit 0
