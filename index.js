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
  console.log("Restarting Bitcoin Cash Client");

  const deletedDocker = await exec('docker rm bch-regtest -f');
  
  exec('docker run --name bch-regtest -p 18332:18332 slashrsm/bitcoin-cash-regtest:latest &');

  console.log("Bitcoin Cash Client restarted and listens at port 18332");
}

async function startBitboxApi() {
    // delete the bch-regtest
    console.log("Starting BITBOX Api listens at port 3000");
  
    const api = await exec('BITCOINCOM_BASEURL=http://localhost:3000/api/ RPC_BASEURL=http://127.0.1.0:18332/ RPC_PASSWORD=regtest RPC_USERNAME=regtest ZEROMQ_PORT=0 ZEROMQ_URL=0 NETWORK=local node ./node_modules/rest.bitcoin.com/app.js');
    
    console.log(api);
}

startDocker()
.then(() => {
    startBitboxApi();
})


