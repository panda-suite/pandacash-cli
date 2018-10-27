const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

clear();

console.log(
  chalk.yellow(
    figlet.textSync('PandaCash', { horizontalLayout: 'full' })
  )
);


async function startDocker() {
  // delete the bch-regtest
  console.log("Restarting docker container");

  const deletedDocker = await exec('docker rm bch-regtest -f');
  
  exec('docker run --name bch-regtest -p 18332:18332 slashrsm/bitcoin-cash-regtest:latest &');

  console.log("Docker container restarted");
}

startDocker();
