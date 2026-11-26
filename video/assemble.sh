#!/bin/bash
# Gabungkan video utama + dokumenter + ending jadi satu file di bawah 100 MB.
# Pemakaian: assemble.sh <folder render>
set -e
R=${1:-/home/user/International-Class-Video-Profile-2026/media/render3}
V=/home/user/International-Class-Video-Profile-2026/video
cd $R
printf "file 'm0.mp4'\nfile 'm1.mp4'\nfile 'm2.mp4'\nfile 'm3.mp4'\n" > m.txt
printf "file 'd0.mp4'\nfile 'd1.mp4'\nfile 'd2.mp4'\nfile 'd3.mp4'\n" > d.txt
ffmpeg -v error -y -f concat -safe 0 -i m.txt -c copy main.mp4
ffmpeg -v error -y -f concat -safe 0 -i d.txt -c copy doc.mp4
dur() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
MD=$(dur main.mp4); DD=$(dur doc.mp4); ED=$(dur e.mp4); XF=0.8
O1=$(python3 -c "print(round($MD-$XF,3))"); O2=$(python3 -c "print(round($MD+$DD-2*$XF,3))"); TOT=$(python3 -c "print(round($MD+$DD+$ED-2*$XF,3))")
ED_MS=$(python3 -c "print(int(($MD+$DD-2*$XF)*1000))")
VB=$(python3 -c "print(int(95e6*8/$TOT/1000 - 160 - 120))")
echo "main=$MD doc=$DD end=$ED total=$TOT videoBitrate=${VB}k"
FC="[0:v][1:v]xfade=transition=fade:duration=$XF:offset=$O1[x];[x][2:v]xfade=transition=fade:duration=$XF:offset=$O2,format=yuv420p[v]"
AC="[3:a]apad,atrim=0:$TOT[a1];[4:a]adelay=${ED_MS}|${ED_MS},apad,atrim=0:$TOT[a2];[a1][a2]amix=inputs=2:normalize=0[a]"
ffmpeg -v error -y -i main.mp4 -i doc.mp4 -i e.mp4 -filter_complex "$FC" -map "[v]" -c:v libx264 -preset slow -b:v ${VB}k -pass 1 -passlogfile pl -r 60 -an -f mp4 /dev/null
ffmpeg -v error -y -i main.mp4 -i doc.mp4 -i e.mp4 -i $V/sfx/sfx-track.wav -i $V/sfx/end_sfx-track.wav -filter_complex "$FC;$AC" -map "[v]" -map "[a]" \
  -c:v libx264 -preset slow -b:v ${VB}k -pass 2 -passlogfile pl -r 60 -c:a aac -b:a 160k -movflags +faststart IC2026_Video_Lengkap_v2.mp4
ls -la IC2026_Video_Lengkap_v2.mp4
