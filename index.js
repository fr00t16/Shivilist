const { exec } = require('child_process');
const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function openTerminalAndRun(command) {
  const terminalCommand =
    process.platform === 'win32'
      ? `start cmd /k "${command}"`
      : process.platform === 'darwin'
      ? `open -a Terminal "${command}"`
      : `x-terminal-emulator -e "${command}"`;

  exec(terminalCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(chalk.red(`Error: ${error.message}`));
      return;
    }
    if (stderr) {
      console.error(chalk.red(`Error: ${stderr}`));
      return;
    }
    console.log(chalk.green(`Command executed: ${command}`));
    startMenu();
  });
}


	const cuy = `
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@BP5B&@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@#57:    :!YB@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@#P7:  ^?PBBBGJ: :!YB@@@@@@@@@@@@@@@
	@@@@@@@@@@@#P?^  ^?P##P?^:^J@@^ :~.:!YB@@@@@@@@@@@
	@@@@@@@@@Y~  :?P##G?^. :?7 .&@~ ~B#GJ^ :?@@@@@@@@@
	@@@@@@@@B  7#&GJ~. ^7  P@5 .!^.^~::7#@5  B@@@@@@@@
	@@@@@@@@B .&@J    !@@~ :7:    Y@B?  Y@B  B@@@@@@@@
	@@@@@@@@B  J&&57^  7P##P??G57.^^.~JB@P:  B@@@@@@@@
	@@@@@@@@@P!:.~JG#BP7^:^?PGJP@#: !#55#&J  B@@@@@@@@
	@@@@@@@@@GGBB57..~?P##P?:  .&@! .   ?@#  B@@@@@@@@
	@@@@@@@@B  .^?G7 .7^:^J@@7 .&@!     Y@B  B@@@@@@@@
	@@@@@@@@B  P5.  ^Y@@5  P@P .PY. :75#&G~  B@@@@@@@@
	@@@@@@@@B  #@^ 7@#?~^!5@#~  :!5B#BY~::^  B@@@@@@@@
	@@@@@@@@@J^#@^ Y@Y .5B5!:~YB#BY!:.~JG@#^J@@@@@@@@@
	@@@@@@@@@@@@@Y^5@Y     7&@P7:.^?G&@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@P:^5  5@5  5&@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@#@?^.:. ^&@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@B55B&@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
	SGB Team
	Shopee Live Tools
	By An Halim, Rizal S, Faizal R														 
	`;

function displayMenu() {
  console.log(chalk.red(cuy));
  console.log(chalk.green('1. LIVE STREAM'));
  console.log(chalk.green('2. Auto Pin Produk + Spill Voucher + Get Sales'));
  console.log(chalk.green('3. Auto Pin Produk + (Fake Claim Voc) + Get Sales'));
}

function startMenu() {
  displayMenu();

  rl.question(chalk.green('Pilih fitur (1/3): '), (answer) => {
    if (answer === '1') {
      openTerminalAndRun('node LIVESTREAM.js'); 
    } else if (answer === '2') {
      openTerminalAndRun('node SPILLVOC.js'); 
    } else if (answer === '3') {
      openTerminalAndRun('node FAKEVOC.js'); 
    } else {
      console.log(chalk.red('Pilihan tidak valid.'));
      startMenu();
    }
  });
}

startMenu();
