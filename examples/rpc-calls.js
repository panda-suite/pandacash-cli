const panda = require("../index");

const server = panda.server({
    seedAccounts: false,
    enableLogs: false
});

server.listen(8081, (err, pandaCashCore) => {
    if (err) {
        return console.error(err);
    }

    pandaCashCore.blockchain.getinfo().then(result => {
        console.log(result);
     });
});
