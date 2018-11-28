module.exports = exports = function(yargs, version) {
  return yargs
    .strict()
    .option('a', {
      group: 'Accounts:',
      alias: 'accounts',
      describe: 'Number of accounts to generate at startup',
      type: 'number',
      default: 10
    })
    // .option('e', {
    //   group: 'Accounts:',
    //   alias: 'defaultBalanceEther',
    //   describe: 'Amount of ether to assign each test account',
    //   type: 'number',
    //   default: 100.0
    // })
    .option('p', {
      group:'Network',
      alias:'port',
      type: 'number',
      describe: 'Specify the port at startup', 
      default: 48332   
    })
    .option('w', {
      group:'Network',
      alias:'walletPort',
      type: 'number',
      describe: 'Specify the walletPort at startup', 
      default: 48333   
    })    
    .option('m', {
      group: 'Chain:',
      alias: 'mnemonic',
      type: 'string',
      describe: 'bip39 mnemonic phrase for generating a PRNG seed, which is in turn used for hierarchical deterministic (HD) account generation',
      demandOption: false
    })
    // .option('b', {
    //   group: 'Chain:',
    //   alias: 'blockTime',
    //   type: 'number',
    //   describe: 'Block time in seconds for automatic mining. Will instantly mine a new block for every transaction if option omitted. Avoid using unless your test cases require a specific mining interval.',
    //   demandOption: false
    // })
    // .option('t', {
    //   group: 'Chain:',
    //   alias: 'time',
    //   describe: 'Date (ISO 8601) that the first block should start. Use this feature, along with the evm_increaseTime method to test time-dependent code.',
    //   type: 'string',
    //   coerce: (arg) => {
    //     let timestamp = Date.parse(arg);
    //     if (isNaN(timestamp)) {
    //       throw new Error('Invalid \'time\' format');
    //     }
    //     return new Date(timestamp);
    //   }
    // })
    .option('debug', {
      group: 'Other:',
      describe: 'Show debug output from the bitcoin node',
      type: 'boolean',
      default: false
    })
    .showHelpOnFail(false, 'Specify -? or --help for available options')
    .help('help')
    .alias('help', '?')
    .wrap(Math.min(120, yargs.terminalWidth()))    
    .version(version)
}
