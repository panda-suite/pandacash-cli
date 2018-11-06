const bcash = require('bcash');
const walletPlugin = require('bcash/lib/wallet/plugin');

const FullNode = bcash.FullNode;

let node;

// example: https://github.com/bcoin-org/bcash/blob/master/bin/node
const startNode = (opts) => new Promise((resolve, reject) => {
    if (node) {
        return console.log("Node is already initialized.");
    }

    const fullNodeOpts = {
        file: true,
        argv: true,
        env: true,

        // port for the RPC server
        "http-port": opts.port,
        env: {
            BCASH_WALLET_HTTP_PORT: opts.walletPort.toString()
        },
        logFile: true,
        logConsole: opts.debug,
        logLevel: 'debug',
        plugins: [walletPlugin],
        // Start up a blockchain, mempool, and miner using in-memory
        // databases (stored in a red-black tree instead of on-disk).
        memory: true,
        network: "regtest",
        workers: true,
        listen: false,
        loader: require
    };

    node = new FullNode(fullNodeOpts);

    (async () => {
        await node.ensure();
        await node.open();
        await node.connect();

        node.startSync();

        resolve({ node });
    })().catch((err) => {
        console.error(err.stack);

        reject();
    });
});

module.exports = {
    startNode
};

