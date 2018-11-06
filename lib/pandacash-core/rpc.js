const fetch = require('node-fetch');

class PandaCashRPC {
    constructor(host, port, network) {
        this.connectionData = {
            host: host || "127.0.0.1",
            port: port || 18332,
            network: network || "regtest"
        };
    }

    runMethod(methodName, params) {
        return new Promise((resolve, reject) => {
            const body = {
                method: methodName,
                params: params
            };
            
            const stringifedBody = JSON.stringify(body);

            // console.log(stringifedBody);
        
            fetch(`http://${this.connectionData.host}:${this.connectionData.port}`, {
                method: "POST",
                body: stringifedBody
            })
            .then(res => res.json())
            .then(json => {
                if (json.error) {
                    return reject(json.error);
                }

                return resolve(json.result);
            })
            .catch(err => reject(err));
        });
    } 

    methodFactory(methodName) {
        return (params) => this.runMethod(methodName, params);
    }

    initMethods(methods) {
        methods.forEach(method => {
            this[method] = this.methodFactory(method);
        });
    }
}

class PandaCashNodeRPC extends PandaCashRPC {
    constructor(host, port, network) {
        super(host, port, network);

        this.initMethods([
            "getinfo",
            "generatetoaddress",
            "getblockchaininfo",
            "generate"
        ]);
    }
}
class PandaCashWalletNodeRPC extends PandaCashRPC {
    constructor(host, port, network) {
        super(host, port, network);

        this.initMethods([
            "importaddress",
            "listunspent",
            "getwalletinfo",
            "getbalance",
            "sendtoaddress",
            "importprivkey",
            "getaddressesbyaccount",
            "dumpprivkey"
        ]);
    }
}

module.exports = {
    PandaCashWalletNodeRPC,
    PandaCashNodeRPC
};
