`callDummy` is the POC that works with phantom now. Read a dummy anchor contract. (`set-read` is the anchor contract.)


---

If you need to switcch between networks. Change the below code in `./Demo.js`

```js
    // clusterApiUrl returns a string.
    // Use this for devnet / testnet / main-net
    const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
    // Use this for localnet
    const endpoint = useMemo(() => "http://localhost:8899", []);
```