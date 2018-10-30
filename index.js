#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const util     = require('util');
const _exec    = require('child_process').exec;
const exec     = util.promisify(_exec);
const path     = require('path');
const pkg      = require('./package.json');
const yargs    = require('yargs');
const initArgs = require("./args")

var detailedVersion = `Pandacash CLI v${pkg.version}`;

var argv = initArgs(yargs, detailedVersion).argv;

var options = {
  mnemonic: argv.m,
  totalAccounts: argv.a,
  // defaultBalance: argv.e,
  // blockTime: argv.b,
  debug: argv.debug,
  // time: argv.t,
}

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

const IMAGE_NAME = 'pandacash';
const CONTAINER_NAME = 'pandacash';
const BITCOIN_CLI = 'bitcoin-cli -regtest -rpcuser=regtest -rpcpassword=regtest';
const BITCOIN_DATA_DIR = '/opt/bitcoin/';
const REST_APP = path.dirname(require.resolve('rest.bitcoin.com/package.json')) + '/app.js';

const mnemonic = options.mnemonic || generateSeedMnemonic();
const keyPairs = generateSeedKeyPairs(mnemonic, options.totalAccounts);

function generateSeedMnemonic() {
  return BITBOX.Mnemonic.generate(128);
}

function generateSeedKeyPairs(mnemonic, totalAccounts) {
  return BITBOX.Mnemonic.toKeypairs(mnemonic, totalAccounts, true);
}

async function startDocker() {
  // delete the pandacash
  console.log('Restarting Bitcoin Cash Client');

  try {
    await exec(`docker rm ${CONTAINER_NAME} -f`);
  } catch (e) {
    // ignored
  }

  exec(`docker run --name ${CONTAINER_NAME} -p 18332:18332 -p 3002:3002 -p 3001:3001 ${IMAGE_NAME} &`);

  await nodeAvailable();

  console.log('Bitcoin Cash Client restarted and listens at port 18332');
}

async function nodeAvailable() {
  try {
    await exec(`docker exec ${CONTAINER_NAME} ${BITCOIN_CLI} getblockchaininfo`);
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
    await exec(`docker exec ${CONTAINER_NAME} ${BITCOIN_CLI} importaddress ${keyPair.address}`)
    await exec(`docker exec ${CONTAINER_NAME} ${BITCOIN_CLI} generatetoaddress 10 ${keyPair.address}`);

    } catch (e) {
      console.log(e);
    }
  });
  console.log('Advancing blockchain to enable spending');
  await exec(`docker exec ${CONTAINER_NAME} ${BITCOIN_CLI} generate 500`);
}

function enableLogging() {
  console.log('Enabling logging of debug.db.');

  _exec(`docker exec -i ${CONTAINER_NAME} tail -n10 -f ${BITCOIN_DATA_DIR}/regtest/debug.log`)
  .stdout.on('data', function(data) {
    console.log(data.toString());
  });
}

async function startBitboxApi() {
  // delete the pandacash
  console.log('Starting BITBOX API at port 3000');

  await exec(`BITCOINCOM_BASEURL=http://localhost:3000/api/ RPC_BASEURL=http://localhost:18332/ RPC_PASSWORD=regtest RPC_USERNAME=regtest ZEROMQ_PORT=0 ZEROMQ_URL=0 NETWORK=local node ${REST_APP}`);
}

function printPandaMessage() {
  process.stdout.write(`
    ${detailedVersion}

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

    Bitcoin Cash Listening on http://localhost:18332
    BITBOX API running at http://localhost:3000/v1/
    BITBOX API Docs running at http://localhost:3000/
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

  if (options.debug) {
    enableLogging();
  }
})();


