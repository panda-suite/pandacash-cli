#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');
const pandacashCore = require('./pandacash-core');

const bootstrap = () => {
  pandacashCore.startNode()
  .then(() => {
    pandacashCore.seedAccounts();

    pandacashCore.startApi();
    pandacashCore.printPandaMessage();
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
