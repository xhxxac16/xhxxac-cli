#!/usr/bin/env node

const program = require('commander');
const shell = require('shelljs');
const logUpdate = require('log-update');

program
  .version('1.0.0')
  .usage('app_name')
  .description('构建work模板')
  .parse(process.argv);

 if (!program.args.length) {
   program.help();
 }
 if (program.args.length === 1) {
   shell.mkdir('-p', program.args[0]);
   shell.cd(program.args[0]);
   shell.exec('git init');
   let i = 0;
   const frames = ['-', '\\', '|', '/'];
   const interval = setInterval(() => {
    const frame = frames[i = ++i % frames.length];
    logUpdate(` ${frame} initializing `);
   }, 50)
   shell.exec('git pull git@github.com:xhxxac16/work-temp.git', (code) => {
     clearInterval(interval);
     if (code !== 0) {
       console.log('Error! Try again');
       shell.exit(1);
     }
     console.log('Completed! You are  good to go!');
   })
 }