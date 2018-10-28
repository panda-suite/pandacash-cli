# pandacash-cli
Panda Suite is a suite of tools to make BCH development more accessible to every developer.

When developing applications for Bitcoin Cash, it is important that its functionality is well-tested, as the app can potentially be dealing with large amounts of money. For testing purposes, there is a public Bitcoin Cash testnet, but this testnet can not be used without an internet connection, and obtaining larger amounts of tBCH can be cumbersome. Finally, in earlier stages of development, many developers would rather not be using a public network already, and would rather develop locally until development has furthered.

This is where `pandacash-cli` comes in. `pandacash-cli` is a one-click Bitcoin Cash blockchain with pre-funded BCH addresses, enabling developers to quickly start working with BCH without any hassle. `pandacash-cli` is similar to [`ganache-cli`](https://github.com/trufflesuite/ganache-cli), but for Bitcoin Cash.

## Prerequisites
To run `pandacash-cli`, make sure that [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) are installed.
On macOS these tools can be installed through [Homebrew](https://brew.sh/).
```bash
brew install node
brew cask install docker
```

## Installation
Make sure that Docker is running before installing `pandacash-cli`. `pandacash-cli` can then be installed through `npm`.
```bash
npm install --global pandacash-cli
```

## Usage
After installing `pandacash-cli`, it can be used as a command-line tool to quickly spin up a local development BCH blockchain with a single command. The local blockchain comes with ten pre-funded BCH addresses, which can be used in the local development process. `pandacash-cli` will also spin up a REST API to interface with the local blockchain that is fully compatible with [BITBOX](https://developer.bitcoin.com/bitbox/).

```bash
pandacash-cli
```

```bash
  ____                        _            ____                 _
 |  _ \    __ _   _ __     __| |   __ _   / ___|   __ _   ___  | |__
 | |_) |  / _` | | '_ \   / _` |  / _` | | |      / _` | / __| | '_ \
 |  __/  | (_| | | | | | | (_| | | (_| | | |___  | (_| | \__ \ | | | |
 |_|      \__,_| |_| |_|  \__,_|  \__,_|  \____|  \__,_| |___/ |_| |_|

Restarting Bitcoin Cash Client
Bitcoin Cash Client restarted and listens at port 18332
Seeding accounts
Advancing blockchain to enable spending
Starting BITBOX API at port 3000

    PandaCash CLI v0.0.1

    Available Accounts
    ==================
    (0) bchreg:qr9mp5wlj0qey2es35j99kg0qn4lwj9jsqvwacyyfs
    (1) bchreg:qq7e82yqmlwf94u085vc402ecv26rvl09srlpjkf09
    (2) bchreg:qqpgxm3j008hlxqtjdxtxrpylvvasg7dpql2xrwhqz
    (3) bchreg:qrkw3ytggq4g5ng3v0n9efrnw9q9zvdrjy5xwjnncs
    (4) bchreg:qp9jzuvszclraqq7jh485pf3p2dn5cyw3gmpdnehzc
    (5) bchreg:qrkgyqf04a8x55a9juwm9k6evdysmzq2zgjcl4y93e
    (6) bchreg:qz540yauansl6lu32j0uhrlzzvyk4s2nlufw5jcrqz
    (7) bchreg:qpy7us0e6chgej3lhwrpr6rlvtlym5hrh5rsp63g68
    (8) bchreg:qpejwem46w6m4ah9lkr0v5gdaqy277dxdc7rgg4wl0
    (9) bchreg:qzeekdn8jwn48kaufzru4zhwuphme79695ln2kpmpy

    Private Keys
    ==================
    (0) cV59RxmDATEV3x66grEWGbWgvGHYCQoCu9uDwtF4uyQtxTm52Ptb
    (1) cSnTygYBZdbH2fNzoPzk9kARJNc6zaAsUyvpWfUbztFmYctaAw4E
    (2) cVEiVmNNs8W2nTqHkcM1Ghpga4SQijw3W86eEerBp5Ynxe8zWq8d
    (3) cN35RxP1bhyuoSnMF6DZSa6ZiVddZ6Rm5MFVQUSt1qTDua35jVR6
    (4) cV6ughqaPwG1DqqW8oWk7PC3PA9SUGCXfxxSyPe58pQivchVHR9i
    (5) cQ4cBokvYvSL8TWLiWGZESS2YVQDxXXpoqh3QAUizU2sBfJnsHiJ
    (6) cPbDNta1FNgvfKR44hS37aEQai6oS31LVDD6kpFZoGkuri64ULya
    (7) cR38r4hUmgfuyTEqkiWtaxwUWZyc6LA8M6JAb9pmjereWUhBwGJp
    (8) cW1HaJ2b5FrFA5ya5sHMciUC9WaQJQsZu5n5odWsSKJToXoGhMqr
    (9) cQb4ycXBeecZga3cvq18KEUxwxH1qARhQQ38KJvyX8QxLgEj5Bqe

    HD Wallet
    ==================
    Mnemonic:      unveil stadium curtain now network cabbage fun silly spider neither machine power
    Base HD Path:  m/44'/145'/0'/0/{account_index}

    Bitcoin Cash Listening on http://localhost:18332
    BITBOX API running at http://localhost:3000/v1/
    BITBOX API Docs running at http://localhost:3000/
```

The `pandacash-cli` blockchain can be reached through JSON-RPC on `http://localhost:18332` and through a REST API on `http://localhost:3000/`. Most importantly, it can be used inside BITBOX applications, by defining a new `local` bitbox environment:

**bitbox.js**
```javascript
exports.config = {
  networks: {
    development: {
      restURL: "https://trest.bitcoin.com/v1/"
    },
    production: {
      restURL: "https://rest.bitcoin.com/v1/"
    },
    local: {
      restURL: "http://localhost:3000/v1/"
    }
  }
};
```

## Advanced Usage
### Debugging the `pandacash-cli` blockchain
You can enter the running Docker container, and use regular `bitcoin-cli` commands.
```bash
docker exec -it pandacash /bin/bash
bitcoin-cli -regtest -rpcuser=regtest -rpcpassword=regtest help
```

## Under the hood
PandaCash consists of the following components:
* Bitcoin-ABC in regtest mode
  * Doesn't sync with other Bitcoin nodes, and immediately creates new blocks on every transaction.
* Prefunded addresses
  * 10 addresses with 62.5 spendable BCH each, generated from a random mnemonic.
* rest.bitcoin.com REST API
  * A local version of the rest.bitcoin.com code that connects to the `pandacash-cli` blockchain.

# Licence
Copyright 2018 Panda Suite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
