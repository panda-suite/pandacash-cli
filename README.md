# Pandacash CLI
When developing applications for Bitcoin Cash, it is important that its functionality is well-tested, as the app can potentially be dealing with large amounts of money. For testing purposes, there is a public Bitcoin Cash testnet, but this testnet can not be used without an internet connection, and obtaining larger amounts of BCH can be cumbersome. Finally, in earlier stages of development, many developers would rather not be using a public network already, and would rather develop locally until development has furthered.

This is where `pandacash-cli` comes in. `pandacash-cli` is a one-click Bitcoin Cash blockchain with pre-funded BCH addresses, enabling developers to quickly start working with BCH without any hassle. `pandacash-cli` is similar to [`ganache-cli`](https://github.com/trufflesuite/ganache-cli), but for Bitcoin Cash. `pandacash-cli` is a wrapper around [pandacash-core](https://www.npmjs.com/package/pandacash-core).

## Prerequisites
To run `pandacash-cli`, make sure that [Node.js](https://nodejs.org/) is installed.
On macOS these tools can be installed through [Homebrew](https://brew.sh/).
```bash
brew install node
```

## Installation
```bash
npm install --global pandacash-cli
```

## Usage
After installing `pandacash-cli`, it can be used as a command-line tool to quickly spin up a local development BCH blockchain with a single command. The local blockchain comes with ten pre-funded BCH addresses, which can be used in the local development process.

**Command Line**
```bash
$ pandacash-cli <options>
```

Options:
* `-a` or `--accounts`: Specify the number of accounts to generate at startup.
* `-m` or `--mnemonic`: bip39 mnemonic phrase for generating a PRNG seed, which is in turn used for hierarchical deterministic (HD) account generation.
* `-p` or `--port`: Specify the port at startup
* `-w` or `--walletPort`: Specify the walletPort at startup
* `--debug`: Show debug output from the bitcoin node.

```bash
  ____                        _            ____                 _
 |  _ \    __ _   _ __     __| |   __ _   / ___|   __ _   ___  | |__
 | |_) |  / _` | | '_ \   / _` |  / _` | | |      / _` | / __| | '_ \
 |  __/  | (_| | | | | | | (_| | | (_| | | |___  | (_| | \__ \ | | | |
 |_|      \__,_| |_| |_|  \__,_|  \__,_|  \____|  \__,_| |___/ |_| |_|

Restarting Bitcoin Cash Client
Bitcoin Cash Client restarted and listens at port 48332
Seeding accounts
Advancing blockchain to enable spending
Starting BITBOX API at port 3000

    PandaCash CLI v0.4.2

    Available Accounts
    ==================
    (0) bchreg:qpk8s58gaal6gwhvyulxszzecws539g27c50v0nk6t
    (1) bchreg:qqm2nlulp8ulnnhxqpmmtkvvwmkr8usrhggh3z5uwl
    (2) bchreg:qrl5aqss5e7av0606zl5ajnj2xurkf280gwyqff9v6
    (3) bchreg:qqahjdfalxw9j2t57ajs5jctl9ayzp5yk553yvxwv3
    (4) bchreg:qp3qhranmxzpr42rn0sl3rqmvdhrcty9l5nugh9ysp
    (5) bchreg:qraulxcveneskyfayw78fyaxhvr6t8w3ssp7zclse8
    (6) bchreg:qqahhkf755uz3dz8g48d3dzgvee0p4c79ynffxevqh
    (7) bchreg:qr7tgfwz2gzcy424v7g34enhugs02e7qkukh96cfc7
    (8) bchreg:qps5zg80jh4lden2crvzr5uzra8tesfs2vjp4l6z0t
    (9) bchreg:qqc0pw9q5c7ssx6wxpug63w3y6vlw0zamqjjp3p5mr

    Private Keys
    ==================
    (0) cVABvrFC8MXZJHSCyULa99MXDsQdLeQwKHxjGXughgd6pXNtd558
    (1) cPZ2RbJK6UYVjeMwpgtd8EvnzjfdZraegcsddz6jPmajE4Qe848d
    (2) cSDUAHNne1ssgFsavbjp8mLBy7CEtqgYM874konLWiy4BVbf85PM
    (3) cT3ApxBWsoX62jUZiJcpzsXQHbXB4sTgdH8PF2qDTdHSgaLurcJJ
    (4) cV9tvwoc9iDpK2kWLLzxEdRFe68LNMTrZQ7xLiyhCuZGX8pQfpGH
    (5) cMmQyLbXeX9jcucMwr4GFQKwWr7knCPqnS6GU7b7HD1D6R8xR755
    (6) cQ2ULCzf2FwcUsV1rioHrEVUR1p4zUmjcpEVFHmBTdM6CJP7Si2H
    (7) cNYwTL8nFm9ckqwRMDuRuTUd1NraSkTs2Np87TuBCCnvNn3enVy6
    (8) cVY8RP3UXBrZksGPNhAR72qpGHkYmmLVu6ycgizSEAYWrhHvbhia
    (9) cUHqwE6oXE5dDQrn8bXwkYmm71vViwzjGseGeSPCyUjThEXZHpXG

    HD Wallet
    ==================
    Mnemonic:      evil sudden oven discover exist approve can catalog farm ivory mom rug
    Base HD Path:  m/44'/1/0/0/{account_index}

    Network: regtest
    ==================
    Bitcoin Cash Node Listening on http://localhost:48332
    Bitcoin Cash Wallet Listening on http://localhost:48333
```

## More usage options - pandacash-core
In order to use pandacash in your tests or as a server, use [`pandacash-core`](https://www.npmjs.com/package/pandacash-core).


## Under the hood
PandaCash consists of the following components:
* bcash implementation of bitcoin cash node in regtest mode
  * Doesn't sync with other Bitcoin nodes, and immediately creates new blocks on every transaction.
* Prefunded addresses
  * 10 addresses with spendable BCH each, generated from a random mnemonic.

## Contributors
* Adrian Barwicki
* Rosco Kalis

# Licence
Copyright 2018 Panda Suite

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
