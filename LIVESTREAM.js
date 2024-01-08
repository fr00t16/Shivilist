const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the RTMP link and Stream KEY: ', (rtmpLink) => {
  rl.question('Enter Video Name: ', (inputVideo) => {
      ffmpeg()
        .input(inputVideo)
        .inputOptions(['-stream_loop -1'])
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
        '-preset', 'slow',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-profile:v', 'main',
        '-level', '4.1',
        '-b:v', '2500k',
        '-r', '30',
        '-g', '60',
        '-b:a', '128k',
        '-ac', '2',
        '-ar', '44100',
      ])
