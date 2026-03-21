# Kopiert Video(s) von Desktop\videos oder Desktop\Videos nach public\Video
$ErrorActionPreference = "Stop"
# scripts/ -> Projektroot (Ordner mit package.json)
$projectRoot = Split-Path $PSScriptRoot -Parent
if (-not (Test-Path (Join-Path $projectRoot "package.json"))) {
  Write-Host "package.json nicht gefunden unter $projectRoot"
  exit 1
}

$srcDir = @(
  (Join-Path $env:USERPROFILE "Desktop\videos"),
  (Join-Path $env:USERPROFILE "Desktop\Videos")
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $srcDir) {
  Write-Host "Kein Ordner gefunden: Desktop\videos oder Desktop\Videos"
  exit 1
}

$dest = Join-Path $projectRoot "public\Video"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$files = Get-ChildItem -Path $srcDir -File | Where-Object {
  $_.Extension -match '\.(mp4|mov|webm)$'
}
if (-not $files -or $files.Count -eq 0) {
  $files = Get-ChildItem -Path $srcDir -File
}

if (-not $files -or $files.Count -eq 0) {
  Write-Host "Keine Dateien in: $srcDir"
  exit 1
}

$preferred = $files | Where-Object { $_.Name -match "aerial|austrian|vorarl" } | Select-Object -First 1
$toCopy = if ($preferred) { @($preferred) } else { $files }

foreach ($f in $toCopy) {
  $target = Join-Path $dest $f.Name
  Copy-Item -LiteralPath $f.FullName -Destination $target -Force
  Write-Host "OK: $($f.Name) -> public\Video\"
}

# Einzelnes MP4 zusätzlich als hero.mp4 (Hero lädt das als Fallback)
if ($toCopy.Count -eq 1 -and $toCopy[0].Extension -ieq ".mp4") {
  Copy-Item -LiteralPath $toCopy[0].FullName -Destination (Join-Path $dest "hero.mp4") -Force
  Write-Host "OK: hero.mp4 (Kopie für Hero-Fallback)"
}

exit 0
