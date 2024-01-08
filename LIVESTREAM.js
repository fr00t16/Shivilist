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
        .outputOptions(['-preset veryfast', '-r 30', '-b:v 2000k']) // Sesuaikan FPS dan Frame Rate di line ini
        .withOutputFormat('flv')
        .output(`${rtmpLink}`)
        .on('end', () => {
          console.log('Stream ended');
          rl.close();
        })
        .on('error', (err) => {
          console.error('Error:', err);
          rl.close();
        })
        .on('progress', (progress) => {
          console.log('Frames: ' + progress.frames);
        })
        .run();
      });
});