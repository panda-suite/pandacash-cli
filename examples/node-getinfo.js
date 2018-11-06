const panda = require("../index");

const server = panda.server({
    seedAccounts: false,
    enableLogs: false
});

server.listen({
    port: 8081,
    walletPort: 8082
}, (err, pandaCashCore) => {
    if (err) {
        return console.error(err);
    }

    pandaCashCore
        .nodeRPC
        .getinfo()
        .then(result => {
            console.log(result);

            process.exit();
        })
        .catch(err => {
            console.log(err);

            process.exit();
        });
});
