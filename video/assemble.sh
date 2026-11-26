#!/bin/bash
# Gabungkan video utama + dokumenter jadi satu file, ukuran target di bawah 100 MB.
set -e
R=/home/user/International-Class-Video-Profile-2026/media/render2
V=/home/user/International-Class-Video-Profile-2026/video
cd $R
printf "file 'm0.mp4'\nfile 'm1.mp4'\nfile 'm2.mp4'\nfile 'm3.mp4'\n" > m.txt
printf "file 'd0.mp4'\nfile 'd1.mp4'\nfile 'd2.mp4'\nfile 'd3.mp4'\n" > d.txt
ffmpeg -v error -y -f concat -safe 0 -i m.txt -c copy main.mp4
ffmpeg -v error -y -f concat -safe 0 -i d.txt -c copy doc.mp4
MD=$(ffprobe -v error -show_entries format=duration -of csv=p=0 main.mp4)
DD=$(ffprobe -v error -show_entries format=duration -of csv=p=0 doc.mp4)
XF=0.8
OFF=$(python3 -c "print(round($MD-$XF,3))"); TOT=$(python3 -c "print(round($MD+$DD-$XF,3))")
# bitrate: 95 MB total, audio 160k
VB=$(python3 -c "print(int(95e6*8/$TOT/1000 - 160 - 120))")
echo "main=$MD doc=$DD total=$TOT videoBitrate=${VB}k"
FC="[0:v][1:v]xfade=transition=fade:duration=$XF:offset=$OFF,format=yuv420p[v]"
ffmpeg -v error -y -i main.mp4 -i doc.mp4 -filter_complex "$FC" -map "[v]" -c:v libx264 -preset slow -b:v ${VB}k -pass 1 -passlogfile pl -r 60 -an -f mp4 /dev/null
ffmpeg -v error -y -i main.mp4 -i doc.mp4 -i $V/sfx/sfx-track.wav -filter_complex "$FC;[2:a]apad,atrim=0:$TOT[a]" -map "[v]" -map "[a]" \
  -c:v libx264 -preset slow -b:v ${VB}k -pass 2 -passlogfile pl -r 60 -c:a aac -b:a 160k -movflags +faststart IC2026_Video_Lengkap.mp4
ls -la IC2026_Video_Lengkap.mp4
