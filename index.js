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
  
  exec('docker run --name bch-regtest -p 18332:18332 pandacash &');

  console.log("Bitcoin Cash Client restarted and listens at port 18332");
}

async function startBitboxApi() {
    // delete the bch-regtest
    console.log("Starting BITBOX API at port 3000");
  
    const api = await exec('BITCOINCOM_BASEURL=http://localhost:3000/api/ RPC_BASEURL=http://localhost:18332/ RPC_PASSWORD=regtest RPC_USERNAME=regtest ZEROMQ_PORT=0 ZEROMQ_URL=0 NETWORK=local node ./node_modules/rest.bitcoin.com/app.js');
}

startDocker()
.then(() => {
    startBitboxApi();


    console.log(`
    PandaCash CLI v0.0.1

    Available Accounts
    ==================
    (0) 12azUvcmPmVS4DRsHdvLGXbPYmeGbmWkwg
    (1) 1GTNU2XZMCFK3TMB8sj9GbYws6saYzBx3U
    (2) 1Fx19LgHSd9TqGj14Mcw5ELBvM26iDJToa
    (3) 14JZLt9JtQHwzR2wLF9WoYFTvwBJruCUqb
    (4) 1BqiCyRZxD5dVoKUccASWzAY7FK3DRKnfA
    (5) 1Go9LhwZiJYkR2DgUoVnKW6ib4sWUTC5Vv
    (6) 1LwN9v5xD3TzKQZmcXeMFpnzcbmxpyyyoU
    (7) 1PPLrrtdwsMETVhGZLgWE7FZoWXBD7UF3f
    (8) 12Gop9CArngzWtBpuRSyHk8i7saByYFTJn
    (9) 1MTBGNkHVt9RG1R9XbkkmAamhJwA5T3YPL
    
    Private Keys
    ==================
    (0) 5KYargKzWiWgVpqGe7NbcE4RiCdSeektP4Lc58WsF5VP4Ypf6Ky
    (1) 5Jya1pefFGMUeeq3s28FZnR7MKQFTybB4inbu3fjxEg58JpSYaZ
    (2) 5K2CgRjpx95EBHq3dHqxaq11VPnFPzMofNeXXLqpeziRpH1jAUM
    (3) 5K822bWyzLEqJ5RSrrXekcQ2AMyQ1Zo3AJNeqJpCgihcpzuXuTK
    (4) 5KUXHabVL4Re1fitoUh6DwLaQeoc4s8krjppjKk1PBtx1k3hR2E
    (5) 5KUXHabVL4Re1fitoUh6DwLaQeoc4s8krjppjKk1PBtx1k3hR2E
    (6) 5K3davPARvSX8owRheokx58xesE63mDJb3JPErSbp8GWB8cJJEP
    (7) 5KKkQxAFaTGTYpLmWXtd6WvvCjK8jmg9wsvGVvU7LuExrroCmHp
    (8) 5KY9DP7K2SsvrP454f622c3vx6Wi7y3wH2T9qLNhBoNrNaaxHeC
    (9) 5KBxpFbihW4UwyTh7dW5Kw3PwhMeqduzeEGiLQ5TSs7aGP5VyVd
    
    HD Wallet
    ==================
    Mnemonic:      walnut amazing bitcoin cash finger yard slice funny cotton office hat gallery
    Base HD Path:  m/44'/145'/0'/0/{account_index}
    
    Bitcoin Cash Listening on localhost:18332
    BITBOX running at localhost:3000
    BITBOX API running at localhost:3000/api
    `);
})


