const blockchain = require('../pandacash-core/rpc');

blockchain.getinfo().then(result => {
   console.log(result);
});


blockchain.importaddress("RCFhpyWXkz5GxskL96q4KtceRXuAMnWUQo").then(result => {
    console.log(result);
 });