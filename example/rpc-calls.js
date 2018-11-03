let BCC = require("bitcoin-cash-rpc");
let bcc = new BCC("127.0.0.1", "regtest", "regtest", 18332, 3000);

const runMethod = async (methodName) => {
    let res = await bcc[methodName]();

    console.log(res);
};

runMethod("getInfo");

runMethod("getWalletInfo");
