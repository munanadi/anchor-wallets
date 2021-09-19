import { Button } from '@material-ui/core';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
// import { Keypair, SystemProgram, Transaction, Connection } from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
// import { Provider } from "@project-serum/common";
// import Wallet from "@project-serum/sol-wallet-adapter";
import React, { useCallback } from 'react';
import { useNotify } from './notify';
import * as idl from './idl.json';


const InitializeAccount = () => {

    const { adapter, wallets } = useWallet();
    const { connection } = useConnection();
    const opts = {
        preflightCommitment: "recent",
        commitment: "recent",
    };

    // const wallet = new Wallet(adapter)
    // const wallet = new Wallet("https://sollet.io", "http://localhost:8899")
    const provider = new Provider(connection, wallets[0], opts);
    // console.log(provider);

    const program = new Program(idl.default, "6FZKYLfT1tUPN5CuyqUNWREcr3utyvbn5LR5urSpTqFe", provider);
    // console.log(program);

    const notify = useNotify();

    const onClick = useCallback(async () => {
        try {
            console.log(wallets[0])
            console.log(provider)
            console.log(program)
            // console.log("this works")
            const tx = await program.rpc.dummy();
            // console.log("works?")
            console.log(tx);
        } catch (error) {
            console.log("error", error);
        }
    }, [notify, connection,]);

    return (
        <Button variant="contained" color="secondary" onClick={onClick} >
            Create Account
        </Button>
    );
};

export default InitializeAccount;
