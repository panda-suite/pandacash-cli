const panda = require("../index");

const server = panda.server({
    enableLogs: false
});

server.listen({port: 8081, walletPort: 8082 }, (err, pandaCashCore) => {
    if (err) {
        return console.error(err);
    }

    console.log("Mnemonic: " + pandaCashCore.opts.mnemonic);
    console.log("Account[0] public key: " + pandaCashCore.accounts[0].address);
    console.log("Account[0] private key: " + pandaCashCore.accounts[0].privateKeyWIF);

    process.exit();
});
