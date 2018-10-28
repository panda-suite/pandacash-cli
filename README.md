# panda-cash
PandaCash has been created at the Bitcoin Cash DevCon Hackathon in Amsterdam.

## Why
The vision of Panda Cash is to make Bitcoin Cash easily accessible to every developer.

## What
It is a suite of tools to setup the required environment for working with BCH, Workhole protocol and blockchain applications without much hustle.

### CLI
#### Installation
```bash
npm i
```

```
docker build -t pandacash .
```

#### Running
It will start a local bitcoin cash node, bitbox server and a block explorer.
```bash
npm run start
```

```bash
Restarting Bitcoin Cash Client
Bitcoin Cash Client restarted and listens at port 18332
Seeding accounts
Advancing blockchain to enable spending
Starting BITBOX API at port 3000

    PandaCash CLI v0.0.1

    Available Accounts
    ==================
    (0) bchreg:qq78fwprm49es6e35mqd5eaqtsuzr5fwpc7geakkld
    (1) bchreg:qr66fwu2xc04hzrghpzsx3p0wltwxkyp2c9fl42h9k
    (2) bchreg:qzyw5n8srhs6x7mkcwmudkjdt92rkl39qvl9s63pld
    (3) bchreg:qre0qf3skxgs6njvkhf29esmtng3uwhzrsnlxv86tc
    (4) bchreg:qz2hy04efpvzpctq3cfa40l7xvjv55862ufwu3aqjy
    (5) bchreg:qqe6vy4099pq95dy6xclcw8grk3cs9llzs3r32m65x
    (6) bchreg:qp50yse5f3xnkyhspdls2l3ugpmtuqtu5v5sukctv4
    (7) bchreg:qrrrf733dpye9ppj3jl0y7n2zq85axlhg5ez76wrf2
    (8) bchreg:qz2a43fns5dxf7heuucjcgsrhg6s4w0r2qxyv965yq
    (9) bchreg:qrp3z4sdjnpytn4rc7y3lqc4qxraaweasy54dezkx0

    Private Keys
    ==================
    (0) KwuynVcwWoogZpDuXZiHAEvH8dmTziLaMDgZP8iVqf5kHvrGxeR5
    (1) L3X9c4Nggrmt3QFjQNQJNZC3F5iVCkSRRrdsDoSr6H9MSbDBUBJh
    (2) L17TSBTHTcmg3jRdknP4PE8Q6M2Hk3tvPtW1ZtbDT3BVyCD7rAYr
    (3) KzDNaGFiu3DYzJY2CuBNQTTrhZ66k3xDaUvG8SnDmpAYcXXAzAct
    (4) Kxqty68BX5hqzuJs9u5AMqKTHEZdmCRd7EJhyWYYW96SUPVdmLAS
    (5) KyTKST2WZZFK9WQmz7vfavBp8zDaX1FiZ3S6aRjzqhgrncWsUA6Y
    (6) L2nHRhZQG6LW2MMpiZRj6TCgUoewAFNUtiPExRaKC1Mw2eWNkaUU
    (7) L3RJ7u9vaTvsmaLGy34VuZ6oj15tebDKQTkQvvySRWAfxr4kDsuk
    (8) L1N4KbgseNSPep93dG8WiTapB19JAkAYd4NEYYWiQXb5tHRsdnUa
    (9) L2JPrjsQsbvrSq937oz9Q2dUSbqQNvXcndonDyE5yxwYgQsTxCHA
    HD Wallet
    ==================
    Mnemonic:      visual sing trigger suffer dinner they source inflict isolate patrol hub supreme
    Base HD Path:  m/44'/145'/0'/0/{account_index}

    Bitcoin Cash Listening on http://localhost:18332
    BITBOX API running at http://localhost:3000/v1/
    BITBOX API Docs running at http://localhost:3000/
```

## Debugging
```bash
docker ps
docker exec -i -t pandacash /bin/bash
````

## Under the hood
PandaCash consists of the following components:

### Docker image for ABC bitcoin starting in regtest mode
It starts a compiled version of bitcoin client executed in retest mode that

1. allows developers to start working on blockchain projects without synchronizing the whole block data,

2. creates blocks immediately with new trasactions without waiting times, making the development more responsive.

### Docker image for ABC bitcoin starting in regtest mode
We create initially coinbase transactions and distribute the new coins to the generated addresses for ease of development

### Creation of addresses
bitcoin-com/bitbox-scaffold-react /src/App.js

### bitbox-gui
The bitbox gui is an block explorer that runs locally.

### RPC bitcoin.conf


### RPC and Restful API
NETWORK=mainnet BITCOINCOM_BASEURL=https://test.bch.api.bitcoindotcom.net/api/ RPC_BASEURL=http://127.0.1.0:18332 RPC_PASSWORD= RPC_USERNAME=bitcoin ZEROMQ_PORT=0 ZEROMQ_URL=0 BITDB_TOKEN=0 npm start

# Licence
MIT