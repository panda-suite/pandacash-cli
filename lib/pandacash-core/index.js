const { hd, KeyRing } = require('bcash');
const bchNode = require('./bchNode');
const async = require('async');
const { PandaCashNodeRPC, PandaCashWalletNodeRPC } = require('./rpc');

const sleep = (ms) => {
  return new Promise(resolve => {
      setTimeout(resolve, ms);
  });
}

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();
class PandaCashCore {
  constructor(opts) {
    this.opts = {
      mnemonic: opts.mnemonic || PandaCashCore.generateSeedMnemonic(),
      totalAccounts: opts.totalAccounts || 10,
      port: opts.port || 48332,
      walletPort: opts.walletPort || 48333,
      enableLogs: opts.enableLogs || false,
      debug: opts.debug || false,
    };

    this.nodeRPC = new PandaCashNodeRPC(
      "127.0.0.1",
      this.opts.port,
      "regtest"
    );

    this.walletNodeRPC = new PandaCashWalletNodeRPC(
      "127.0.0.1",
      this.opts.walletPort,
      "regtest"
    );

    this.accounts = PandaCashCore.generateSeedKeyPairs(this.opts.mnemonic, this.opts.totalAccounts);
  }

  static get HDPath() {
    return "m/44'/1/0/0/"
  }

  static generateSeedKeyPairs(mnemonic, totalAccounts) {
    const accounts = [];
    const { HDPrivateKey } = hd;
    const privateKey = HDPrivateKey.fromPhrase(mnemonic);

    for (var index = 0; index < totalAccounts; index++) {
      const deriveSomething = privateKey.derivePath(PandaCashCore.HDPath + index);
      const ring = KeyRing.fromPrivate(deriveSomething.privateKey);
      const account = {};

      account.address = ring.getAddress('string', 'regtest');
      account.privateKeyWIF = ring.toSecret('regtest');

      accounts.push(account);
    }

    return accounts;
  }

  static generateSeedMnemonic() {
    return BITBOX.Mnemonic.generate(128);
  }

 /**
 * We use the bcash implementation
 * http://bcoin.io/api-docs
 */
 async startNode() {
      // delete the pandacash
      this.opts.enableLogs && console.log('Starting Bitcoin Cash blockchain');

      /**
       * Will start the bcash node
       * a) in the regtest mode
       * b) --prefix=${__dirname}/../.bcash
       */
      
      const nodes = bchNode.startNode({
        debug: this.opts.debug,
        port: this.opts.port,
        walletPort: this.opts.walletPort
      });

      this.bchNode = nodes.node;

      await this.nodeAvailable();

      this.opts.enableLogs &&  console.log(`Bitcoin Cash blockchain started and listens at port ${this.opts.port}`);

      return this.bchNode;
  }

  async nodeAvailable() {
    try {
      await this.nodeRPC.getblockchaininfo();
    } catch (e) {
      await sleep(500);
      await this.nodeAvailable();
    }
  }

  async seedAccounts() {
    this.opts.enableLogs && console.log('Seeding accounts');

    for (let i = 0; i < this.accounts.length; i++) {
      await this.walletNodeRPC.importprivkey([this.accounts[i].privateKeyWIF]);
      await this.nodeRPC.generatetoaddress([10, this.accounts[i].address]);
    }

    this.opts.enableLogs && console.log('Advancing blockchain to enable spending');
    await this.nodeRPC.generatetoaddress([500, this.accounts[0].address]);
  }

  /**
   * Starts the wrapper around the RPC commands
   * We currently use the Bitbox implementation.
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
  */

 printPandaMessage(detailedVersion) {
    console.log(`
      ${detailedVersion}

      Available Accounts
      ==================`);
    

    this.accounts.forEach((keyPair, i) => {
      console.log(`
      (${i}) ${keyPair.address}`);
    });

    console.log(`

      Private Keys
      ==================`);

      this.accounts.forEach((keyPair, i) => {
        console.log(`
      (${i}) ${keyPair.privateKeyWIF}`);
    });

    console.log(`

      HD Wallet
      ==================
      Mnemonic:      ${this.opts.mnemonic}
      Base HD Path:  ${PandaCashCore.HDPath}{account_index}
  
      Bitcoin Cash Node Listening on http://localhost:${this.opts.port}
      Bitcoin Cash Wallet Listening on http://localhost:${this.opts.walletPort}
    `);
    /**
     * BITBOX API running at http://localhost:3000/v1/
     * BITBOX API Docs running at http://localhost:3000/
     */
  }
}

module.exports = PandaCashCore;
