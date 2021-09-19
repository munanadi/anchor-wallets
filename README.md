`callDummy` is the POC that works with all solana wallet adapters. This calls a normal dummy anchor program that logs "Called Dummy" with `msg!()`

---
Currently this example works with Phantom and Sollet.

>To Add different wallets to this add them in the `wallets` array in the `Demo.js`.

---

To use the `dummy` isntruction call. Deploy the program given in `solana_program` using `solana deploy` and store this address in `ProgramId` in `Dummy.js`

---

If you need to switcch between networks. Change the below code in `./Demo.js`

```js
    // clusterApiUrl returns a string.
    // Use this for devnet / testnet / main-net
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
    // Use this for localnet
    const endpoint = useMemo(() => "http://localhost:8899", []);
```