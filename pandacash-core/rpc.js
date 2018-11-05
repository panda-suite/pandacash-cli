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
                params
            };
    
            fetch(`http://${this.connectionData.host}:${this.connectionData.port}`, {
                method: 'POST',
                body: JSON.stringify(body)
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
}

class PandaCashNodeRPC extends PandaCashRPC {
    constructor(host, port, network) {
        super(host, port, network);
       
        this.getinfo = this.methodFactory("getinfo");
        this.importaddress = this.methodFactory("importaddress");
        this.generatetoaddress = this.methodFactory("generatetoaddress");
        this.getblockchaininfo = this.methodFactory("getblockchaininfo");
        this.generate = this.methodFactory("generate");

        this.listunspent = this.methodFactory("listunspent");
    }
}
class PandaCashWalletNodeRPC extends PandaCashRPC {
    constructor(host, port, network) {
        super(host, port, network);

        this.listunspent = this.methodFactory("listunspent");
    }
}

module.exports = {
    PandaCashWalletNodeRPC,
    PandaCashNodeRPC
};
