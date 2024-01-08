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
        .inputOptions(['-re', 
                       '-stream_loop -1'
                      ])
        .videoCodec('copy')
        .audioCodec('copy')
        .outputOptions([
        '-preset', 'veryfast',
        '-r', '30',
        '-b:v' '2000k',
        '-f', 'flv',
        '-flvflags', 'no_duration_filesize',
        '-stimeout', '-1',
      ])
