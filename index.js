#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const pandacashCore = require('./pandacash-core');

const bootstrap = (cb) => {
  pandacashCore.startNode()
  .then((node) => {
    pandacashCore.seedAccounts();

    // pandacashCore.startApi();
    pandacashCore.printPandaMessage();

    cb && cb(undefined, node);
  })
};

module.exports = {
  bootstrap
};

if (!module.parent) {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('PandaCash', { horizontalLayout: 'full' })
    )
  );

  bootstrap();

  process.stdin.resume();
}
