# panda-cash
PandaCash has been created at the Bitcoin Cash DevCon Hackathon in Amsterdam.

## Why
The vision of Panda Cash is to make Bitcoin Cash easily accessible to every developer.

## What
It is a suite of tools to setup the required environment for working with BCH, Workhole protocol and blockchain applications without much hustle.

### CLI

It will start a local bitcoin cash node and show 
```bash
pandacash-cli
```

It will display:

```bash
PandaCash CLI v0.0.1

Available Accounts
==================
(0) 12azUvcmPmVS4DRsHdvLGXbPYmeGbmWkwg
(1) 1GTNU2XZMCFK3TMB8sj9GbYws6saYzBx3U
(2) 1Fx19LgHSd9TqGj14Mcw5ELBvM26iDJToa
(3) 14JZLt9JtQHwzR2wLF9WoYFTvwBJruCUqb
(4) 1BqiCyRZxD5dVoKUccASWzAY7FK3DRKnfA
(5) 1Go9LhwZiJYkR2DgUoVnKW6ib4sWUTC5Vv
(6) 1LwN9v5xD3TzKQZmcXeMFpnzcbmxpyyyoU
(7) 1PPLrrtdwsMETVhGZLgWE7FZoWXBD7UF3f
(8) 12Gop9CArngzWtBpuRSyHk8i7saByYFTJn
(9) 1MTBGNkHVt9RG1R9XbkkmAamhJwA5T3YPL

Private Keys
==================
(0) 5KYargKzWiWgVpqGe7NbcE4RiCdSeektP4Lc58WsF5VP4Ypf6Ky
(1) 5Jya1pefFGMUeeq3s28FZnR7MKQFTybB4inbu3fjxEg58JpSYaZ
(2) 5K2CgRjpx95EBHq3dHqxaq11VPnFPzMofNeXXLqpeziRpH1jAUM
(3) 5K822bWyzLEqJ5RSrrXekcQ2AMyQ1Zo3AJNeqJpCgihcpzuXuTK
(4) 5KUXHabVL4Re1fitoUh6DwLaQeoc4s8krjppjKk1PBtx1k3hR2E
(5) 5KUXHabVL4Re1fitoUh6DwLaQeoc4s8krjppjKk1PBtx1k3hR2E
(6) 5K3davPARvSX8owRheokx58xesE63mDJb3JPErSbp8GWB8cJJEP
(7) 5KKkQxAFaTGTYpLmWXtd6WvvCjK8jmg9wsvGVvU7LuExrroCmHp
(8) 5KY9DP7K2SsvrP454f622c3vx6Wi7y3wH2T9qLNhBoNrNaaxHeC
(9) 5KBxpFbihW4UwyTh7dW5Kw3PwhMeqduzeEGiLQ5TSs7aGP5VyVd

HD Wallet
==================
Mnemonic:      walnut amazing bitcoin cash finger yard slice funny cotton office hat gallery

Listening on localhost:81301
```


## Under the hood
PandaCash consists of the following components:

### Docker image for ABC bitcoin starting in regtext mode
It starts a compiled version of bitcoin client executed in retest mode that

1. allows developers to start working on blockchain projects without synchronizing the whole block data,

2. creates blocks immediately with new trasactions without waiting times, making the development more responsive.

### Docker image for ABC bitcoin starting in regtext mode
We create initially coinbase transactions and distribute the new coins to the generated addresses for ease of development

# Licence
MIT
