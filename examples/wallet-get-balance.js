const panda = require("../index");

const server = panda.server({
    seedAccounts: true,
    enableLogs: false,
    debug: false
});

server.listen({
    port: 8081,
    walletPort: 8082
}, (err, pandaCashCore) => {
    if (err) {
        return console.error(err);
    }

    pandaCashCore
    .walletNodeRPC
    .getbalance()
    .then(result => {
        console.log("WALLET BALANCE: " + result);

        process.exit();
    })
    .catch(err => {
        console.log(err);

        process.exit();
    })
});
