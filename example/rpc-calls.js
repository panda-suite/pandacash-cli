const PandaCashRPC = require('../pandacash-core/rpc');

const blockchain = new PandaCashRPC("127.0.0.1", 48332, "regtest");

blockchain.getinfo().then(result => {
   console.log(result);
});


blockchain.importaddress("RCFhpyWXkz5GxskL96q4KtceRXuAMnWUQo").then(result => {
    console.log(result);
 });