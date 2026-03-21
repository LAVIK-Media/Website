#!/usr/bin/env node

import { execSync } from "child_process";
import { readdirSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const videos = [
  {
    input: resolve(ROOT, "Videos/intro.mp4"),
    output: resolve(ROOT, "public/frames/intro"),
    fps: 24,
    name: "intro",
  },
  {
    input: resolve(ROOT, "Videos/scroll-transition.mp4"),
    output: resolve(ROOT, "public/frames/scroll"),
    fps: 24,
    name: "scroll",
  },
];

const QUALITY = 1; // mjpeg quality (1 = best, 2 = high, 31 = worst)
const MAX_WIDTH = 1920;
const EXT = "jpg";

for (const video of videos) {
  console.log(`\n--- Extracting frames: ${video.name} ---`);

  // Ensure output dir exists
  mkdirSync(video.output, { recursive: true });

  // Extract frames as JPEG (high quality)
  const cmd = [
    "ffmpeg",
    "-y",
    `-i "${video.input}"`,
    `-vf "fps=${video.fps},scale=${MAX_WIDTH}:-2"`,
    `-q:v ${QUALITY}`,
    `"${video.output}/frame-%04d.${EXT}"`,
  ].join(" ");

  console.log(`Running: ${cmd}`);
  execSync(cmd, { stdio: "inherit" });

  // Count frames and get dimensions
  const frames = readdirSync(video.output).filter((f) => f.endsWith(`.${EXT}`));
  frames.sort();

  // Probe first frame dimensions
  const probeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${video.output}/${frames[0]}"`;
  const dims = execSync(probeCmd).toString().trim().split("x");

  const manifest = {
    frameCount: frames.length,
    fps: video.fps,
    width: parseInt(dims[0]),
    height: parseInt(dims[1]),
    firstFrame: frames[0],
    lastFrame: frames[frames.length - 1],
  };

  writeFileSync(
    resolve(video.output, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`✓ ${video.name}: ${manifest.frameCount} frames at ${manifest.width}x${manifest.height}`);
}

// Calculate total size
const totalSize = videos.reduce((sum, v) => {
  const frames = readdirSync(v.output).filter((f) => f.endsWith(`.${EXT}`));
  const size = frames.reduce((s, f) => {
    const stat = execSync(`stat -f%z "${v.output}/${f}"`).toString().trim();
    return s + parseInt(stat);
  }, 0);
  console.log(`${v.name}: ${(size / 1024 / 1024).toFixed(2)} MB total`);
  return sum + size;
}, 0);

console.log(`\nTotal frame payload: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
