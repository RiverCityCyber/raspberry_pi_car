#!/bin/bash
find /mnt/ssd/videos -type f -name "*.mjpeg" -mtime +28 -delete
ffmpeg -f v4l2 -input_format mjpeg -video_size 1280x720 -framerate 30 -i /dev/video0 -c:v copy -f segment -segment_time 60 -segment_atclocktime 1 -strftime 1 "dashcam_%Y%m%d_%H%M%S.mjpeg"
