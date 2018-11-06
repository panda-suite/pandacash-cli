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
    .listunspent([ 0, 20, [ pandaCashCore.accounts[0].address ] ])
    .then(result => {
        console.log(result);

        process.exit();
    })
    .catch(err => {
        console.log(err);

        process.exit();
    })
});
