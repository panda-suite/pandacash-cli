const bcash = require('bcash');

const FullNode = bcash.FullNode;

let node;

const startNode = (opts) => new Promise((resolve, reject) => {
    if (node) {
        return console.log("Node is already initialized.");
    }

    node = new FullNode({
        file: true,
        argv: true,
        env: true,

        // port for the RPC server
        "http-port": opts.port,

        logFile: true,
        logConsole: opts.debug,
        logLevel: 'debug',
    
        // Start up a blockchain, mempool, and miner using in-memory
        // databases (stored in a red-black tree instead of on-disk).
        memory: true,
        network: "regtest",
        workers: true,
        listen: false,
        loader: require
    });
    
    (async () => {
        await node.ensure();
        await node.open();
        await node.connect();
    
        node.startSync();

        resolve(node);
    })().catch((err) => {
        console.error(err.stack);

        reject();
    });
});

module.exports = {
    startNode
};

