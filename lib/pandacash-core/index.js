const bchNode = require('./bchNode');
const util = require('../util');
const { BCH, HttpProvider } = require('bchjs');

const BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk');
const BITBOX = new BITBOXSDK.default();
class PandaCashCore {
  constructor(opts) {
    this.opts = {
      mnemonic: opts.mnemonic || PandaCashCore.generateSeedMnemonic(),
      totalAccounts: opts.totalAccounts || 10,
      port: opts.port || 48322,
      enableLogs: opts.enableLogs || false,
      debug: opts.debug || false
    };

    this.blockchain = new BCH(new HttpProvider(`http://localhost:${this.opts.port}`, 'regtest', 'regtest'));

    this.accounts = PandaCashCore.generateSeedKeyPairs(this.opts.mnemonic, this.opts.totalAccounts);
  }

  static generateSeedKeyPairs(mnemonic, totalAccounts) {
    return BITBOX.Mnemonic.toKeypairs(mnemonic, totalAccounts, true);
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
    if (this.opts.enableLogs) {
      console.log('Starting Bitcoin Cash blockchain');
    }

    /**
     * Will start the bcash node
     * a) in the regtest mode
     * b) --prefix=${__dirname}/../.bcash
     */
    this.bchNode = bchNode.startNode({
      debug: this.opts.debug,
      port: this.opts.port,
    });

    await this.nodeAvailable();

    if (this.opts.enableLogs) {
      console.log(`Bitcoin Cash blockchain started and listens at port ${this.opts.port}`);
    }

    return this.bchNode;
  }

  async nodeAvailable() {
    if (!this.blockchain.provider.isConnected()) {
      await util.sleep(500);
      await this.nodeAvailable();
    }
  }

  async seedAccounts() {
    console.log('Seeding accounts');

    this.accounts.forEach(async (keyPair) => {
      try {
        await this.blockchain.importaddress(keyPair.address);
        await this.blockchain.generatetoaddress(10, keyPair.address);
      } catch (e) {
        console.log(e);
      }
    });

    console.log('Advancing blockchain to enable spending');

    await this.blockchain.generate(500);
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
    process.stdout.write(`
      ${detailedVersion}

      Available Accounts
      ==================`);

    this.accounts.forEach((keyPair, i) => {
      process.stdout.write(`
      (${i}) ${keyPair.address}`);
    });

    process.stdout.write(`

      Private Keys
      ==================`);

      this.accounts.forEach((keyPair, i) => {
      process.stdout.write(`
      (${i}) ${keyPair.privateKeyWIF}`);
    });

    console.log(`

      HD Wallet
      ==================
      Mnemonic:      ${this.opts.mnemonic}
      Base HD Path:  m/44'/145'/0'/0/{account_index}

      Bitcoin Cash Listening on http://localhost:${this.opts.port}
    `);
    /**
     * BITBOX API running at http://localhost:3000/v1/
     * BITBOX API Docs running at http://localhost:3000/
     */
  }
}

module.exports = PandaCashCore;
