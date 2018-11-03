const fetch = require('node-fetch');

class PandaCashRPC {
    constructor(host, port, network) {
        this.connectionData = {
            host: host || "127.0.0.1",
            port: port || 48332,
            network: network || "regtest"
        };

        this.getinfo = this.methodFactory("getinfo");
        this.importaddress = this.methodFactory("importaddress");
        this.generatetoaddress = this.methodFactory("generatetoaddress");
        this.getblockchaininfo = this.methodFactory("getblockchaininfo");
        this.generate = this.methodFactory("generate");
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
            .then(json => resolve(json.result))
            .catch(err => reject(err));
        });
    } 

    methodFactory(methodName) {
        return (params) => this.runMethod(methodName, params);
    }
}

module.exports = PandaCashRPC;
