ffmpeg \ -f v4l2 \ -input_format mjpeg \ -video_size 1280x720 \ -framerate 15 \ -i /dev/video0 \ -c:v copy \
