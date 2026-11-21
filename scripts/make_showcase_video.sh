#!/usr/bin/env bash
# Cut the home-page showcase reel from the full highlights film.
#
#   scripts/make_showcase_video.sh            # uses `ffmpeg` on PATH
#   FFMPEG=/path/to/ffmpeg scripts/make_showcase_video.sh
#
# Input : assets-src/highlights.mp4  (4 min, 1080p50, ~600 MB — never deployed)
# Output: public/videos/showcase-highlights.mp4  (muted ~47 s loop, 1080p25, web-sized)
#         public/videos/showcase-highlights.jpg  (poster frame)
set -euo pipefail
cd "$(dirname "$0")/.."

FF="${FFMPEG:-ffmpeg}"
SRC="assets-src/highlights.mp4"
OUT="public/videos/showcase-highlights.mp4"
POSTER="public/videos/showcase-highlights.jpg"

# start:duration (seconds) — story order, skipping letter/pillar-boxed shots
SEGMENTS=(0:6 17:6 33:7 41:5 80:6 184:6 208:5 216:6)

filter=""
labels=""
for i in "${!SEGMENTS[@]}"; do
  IFS=: read -r start dur <<<"${SEGMENTS[$i]}"
  filter+="[0:v]trim=start=${start}:duration=${dur},setpts=PTS-STARTPTS,fps=25,scale=1920:1080:flags=lanczos,setsar=1[v${i}];"
  labels+="[v${i}]"
done
filter+="${labels}concat=n=${#SEGMENTS[@]}:v=1:a=0[out]"

mkdir -p "$(dirname "$OUT")"
"$FF" -hide_banner -loglevel error -y -i "$SRC" \
  -filter_complex "$filter" -map "[out]" -an \
  -c:v libx264 -preset slow -crf 25 -maxrate 3M -bufsize 6M \
  -profile:v high -pix_fmt yuv420p -movflags +faststart \
  "$OUT"

# Poster = the reel's opening frame, so nothing jumps when playback starts
"$FF" -hide_banner -loglevel error -y -ss 1.5 -i "$OUT" -frames:v 1 -q:v 3 "$POSTER"

ls -lh "$OUT" "$POSTER"

# Testimonial images: detail frames from the same film, chosen to show no
# recognisable faces (the testimonials are not from these couples).
#   name : time(s) : crop w:h:x:y (on the 1920x1080 frame)
STILLS=(
  "testimonial-church:120:810:1080:401:0"
  "testimonial-roses:100:900:900:375:0"
  "testimonial-hands:88:900:900:1020:0"
)
mkdir -p public/images/site
for s in "${STILLS[@]}"; do
  IFS=: read -r name t cw ch cx cy <<<"$s"
  "$FF" -hide_banner -loglevel error -y -ss "$t" -i "$SRC" -frames:v 1 \
    -vf "crop=${cw}:${ch}:${cx}:${cy}" -q:v 2 "public/images/site/${name}.jpg"
done
ls -lh public/images/site/testimonial-*.jpg
