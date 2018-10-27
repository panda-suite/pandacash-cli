const chalk   = require('chalk');
const clear   = require('clear');
const figlet  = require('figlet');
const util    = require('util');
const exec    = util.promisify(require('child_process').exec);
const wif     = require('wif');

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

const mnemonic = generateSeedMnemonic();
const keyPairs = generateSeedKeyPairs();

function generateSeedMnemonic() {
  return BITBOX.Mnemonic.generate(128);
}

function generateSeedKeyPairs() {
  /* WIFs are encoded for mainnet, here we decode, then re-encode the WIF for testnet/regtest */
  let keyPairs = BITBOX.Mnemonic.toKeypairs(mnemonic, 10, true);
  let newKeyPairs = [];
  keyPairs.forEach(keyPair => {
    const decodedWif = wif.decode(keyPair.privateKeyWIF);
    const newWif = wif.encode(239, decodedWif.privateKey, decodedWif.compressed);
    newKeyPairs.push({privateKeyWIF: newWif, address: keyPair.address});
  })
  return newKeyPairs;
}

async function startDocker() {
  // delete the bch-regtest
  console.log('Restarting Bitcoin Cash Client');

  try {
    await exec('docker rm pandacash -f');
  } catch (e) {
    // ignored
  }

  exec('docker run --name pandacash -p 18332:18332 pandacash &');

  await nodeAvailable();

  console.log('Bitcoin Cash Client restarted and listens at port 18332');
}

async function nodeAvailable() {
  try {
    await exec('docker exec pandacash bitcoin-cli -regtest -rpcuser=regtest -rpcpassword=regtest getblockchaininfo');
  } catch (e) {
    await sleep(500);
    await nodeAvailable();
  }
}

function sleep(ms) {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
}

async function seedAccounts() {
  console.log('Seeding accounts');
  keyPairs.forEach(async (keyPair) => {
    try {
      await exec(`docker exec pandacash bitcoin-cli -regtest -rpcuser=regtest -rpcpassword=regtest generatetoaddress 10 ${keyPair.address}`);
    } catch (e) {
      console.log(e);
    }
  });
  console.log('Advancing blockchain to enable spending');
  await exec('docker exec pandacash bitcoin-cli -regtest -rpcuser=regtest -rpcpassword=regtest generate 100');
}

async function startBitboxApi() {
  // delete the bch-regtest
  console.log('Starting BITBOX API at port 3000');

  await exec('BITCOINCOM_BASEURL=http://localhost:3000/api/ RPC_BASEURL=http://localhost:18332/ RPC_PASSWORD=regtest RPC_USERNAME=regtest ZEROMQ_PORT=0 ZEROMQ_URL=0 NETWORK=local node ./node_modules/rest.bitcoin.com/app.js');
}

function printPandaMessage() {
  process.stdout.write(`
    PandaCash CLI v0.0.1

    Available Accounts
    ==================`);

  keyPairs.forEach((keyPair, i) => {
    process.stdout.write(`
    (${i}) ${keyPair.address}`);
  });

  process.stdout.write(`

    Private Keys
    ==================`);

  keyPairs.forEach((keyPair, i) => {
    process.stdout.write(`
    (${i}) ${keyPair.privateKeyWIF}`);
  });

  console.log(`

    HD Wallet
    ==================
    Mnemonic:      ${mnemonic}
    Base HD Path:  m/44'/145'/0'/0/{account_index}

    Bitcoin Cash Listening on localhost:18332
    BITBOX running at localhost:3000
    BITBOX API running at localhost:3000/api
  `);
}

(async () => {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('PandaCash', { horizontalLayout: 'full' })
    )
  );

  await startDocker();
  await seedAccounts();
  startBitboxApi();

  printPandaMessage();
})();


