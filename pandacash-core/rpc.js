const fetch = require('node-fetch');

const connectionData = {
    host: "127.0.0.1",
    port: 48332,
    network: "regtest"
};

const runMethod = (methodName, params) => new Promise((resolve, reject) => {
    const body = {
        method: methodName,
        params
    };

    fetch(`http://${connectionData.host}:${connectionData.port}`, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => resolve(json.result))
    .catch(err => reject(err));
});

const methodFactory = (methodName) => (params) => runMethod(methodName, params);

module.exports = {
    getinfo: methodFactory("getinfo"),
    importaddress: methodFactory("importaddress"),
    generatetoaddress: methodFactory("generatetoaddress"),
    getblockchaininfo: methodFactory("getblockchaininfo"),
    generate: methodFactory("generate")
};
