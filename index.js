#! /usr/bin/env node
const chalk    = require('chalk');
const clear    = require('clear');
const figlet   = require('figlet');

const pandacashCore = require('./pandacash-core');

(async () => {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync('PandaCash', { horizontalLayout: 'full' })
    )
  );

  await pandacashCore.startNode();
  // await seedAccounts();
  // startBitboxApi();

  // printPandaMessage();

  if (options.debug) {
    // services.enableLogging();
  }
})();

