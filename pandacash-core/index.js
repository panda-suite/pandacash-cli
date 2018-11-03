const util     = require('util');
const _exec    = require('child_process').exec;
const exec     = util.promisify(_exec);
const path     = require('path');
const yargs    = require('yargs');
const initArgs = require("./args")
const pkg      = require('../package.json');
const PandaCashRPC = require('./rpc');

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

const NODE_PORT = 48332;

const blockchain = new PandaCashRPC("127.0.0.1", NODE_PORT, "regtest");

console.log("OPTIONS:");
console.log(options);

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();

const REST_APP = path.dirname(require.resolve('rest.bitcoin.com/package.json')) + '/app.js';

const mnemonic = options.mnemonic || generateSeedMnemonic();
const keyPairs = generateSeedKeyPairs(mnemonic, options.totalAccounts);

function generateSeedMnemonic() {
  return BITBOX.Mnemonic.generate(128);
}

function generateSeedKeyPairs(mnemonic, totalAccounts) {
  return BITBOX.Mnemonic.toKeypairs(mnemonic, totalAccounts, true);
}

let blockchainStdout;

/**
 * We use the bcash implementation
 * http://bcoin.io/api-docs
 */

async function startNode() {
  // delete the pandacash
  console.log('Starting Bitcoin Cash blockchain');
  
  /**
   * Will start the bcash node
   * a) in the regtest mode
   * b) --prefix=${__dirname}/../.bcash
   */

  const cmd = path.dirname(require.resolve('bcash/package.json')) + `/bin/bcash --network=regtest`;
  
  blockchainStdout = _exec(cmd).stdout;

  if (options.debug) {
    enableLogging();
  }

  await nodeAvailable();

  console.log(`Bitcoin Cash blockchain restarted and listens at port ${NODE_PORT}`);
}

async function nodeAvailable() {
  try {
    await blockchain.getblockchaininfo();
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
      await blockchain.importaddress([ keyPair.address ]);
      await blockchain.generatetoaddress([ 10, keyPair.address ]);
    } catch (e) {
      console.log(e);
    }
  });

  console.log('Advancing blockchain to enable spending');

  await blockchain.generate([ 500, keyPairs[0].address  ])
}

function enableLogging() {
  console.log('Enabling logging of debug.db.');

  blockchainStdout && blockchainStdout.on('data', function(data) {
    console.log(data.toString());
  });
}

/**
 * Starts the wrapper around the RPC commands
 * We currently use the Bitbox implementation.
 */
async function startApi() {
  console.log('Starting BITBOX API at port 3000');

  const commands = [
    "BITCOINCOM_BASEURL=http://localhost:3000/api/",
    `RPC_BASEURL=http://localhost:${NODE_PORT}/`,
    "RPC_PASSWORD=regtest",
    "RPC_USERNAME=regtest",
    "ZEROMQ_PORT=0",
    "ZEROMQ_URL=0",
    "NETWORK=local", 
    `node ${REST_APP}`
  ];

  await exec(commands.join(" "));
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
 
    Bitcoin Cash Listening on http://localhost:${NODE_PORT}
    BITBOX API running at http://localhost:3000/v1/
    BITBOX API Docs running at http://localhost:3000/
  `);
}

module.exports = {
    startNode,
    seedAccounts,
    startApi,
    printPandaMessage,
    enableLogging
}