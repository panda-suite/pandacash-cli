#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const panda = require('pandacash-core');
const pkg      = require('./package.json');

const detailedVersion = `Pandacash CLI v${pkg.version}`;

/**
 * Interface inspired by ganache-cli
 */
module.exports = {
  server: panda.server
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

  const server = panda.server({
    mnemonic: argv.m,
    totalAccounts: argv.a,
    port: argv.p,
    walletPort: argv.w,
    debug: argv.debug,
    enableLogs: true
  });

  server.listen({ port: argv.port || 48332, walletPort: argv.walletPort || 48333 }, (err) => {
      if (err) {
          return console.error(err);
      }

      process.stdin.resume();
  });
}
