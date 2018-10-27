exports.config = {
  networks: {
    local: {
      restURL: "http://127.0.1.1/v1/"
    },
    development: {
      restURL: "https://trest.bitcoin.com/v1/"
    }
  }
};
