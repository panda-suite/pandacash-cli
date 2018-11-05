#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const PandaCashCore = require('./pandacash-core');
const pkg      = require('./package.json');

const detailedVersion = `Pandacash CLI v${pkg.version}`;

const _listen = (opts, cb) => {
  const pandaCashCore = new PandaCashCore(opts);

  pandaCashCore.startNode()
  .then(() => {
    if (pandaCashCore.opts.seedAccounts) {
      pandaCashCore.seedAccounts();
    }

    if (pandaCashCore.opts.enableLogs) {
      pandaCashCore.printPandaMessage(detailedVersion);
    }

    cb && cb(undefined, pandaCashCore);
  })
};

/**
 * Interface inspired by ganache-cli
 */
module.exports = {
  server: (opts) => {
    return {
      listen: (portOpts, cb) => {
        if (typeof portOpts === "number") {
          opts.port = portOpts;
        } else {
          opts.port = portOpts.port;
          opts.walletPort = portOpts.walletPort;
        }

        _listen(opts, cb);
      }
    }
  }
};

/**
 * If started from command-line tool:
 */
if (!module.parent) {
  const yargs    = require('yargs');
  const initArgs = require("./args")

  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('pandacash-cli', { horizontalLayout: 'full' })
    )
  );

  const argv = initArgs(yargs, detailedVersion).argv;

  _listen({
    mnemonic: argv.m,
    totalAccounts: argv.a,
    debug: argv.debug,
    seedAccounts: true,
    enableLogs: true,
    walletPort: argv.walletPort || 48333,
    port: argv.port || 48332
  });

  process.stdin.resume();
}
