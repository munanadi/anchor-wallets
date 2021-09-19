import * as anchor from "@project-serum/anchor";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useNotify } from './notify';

import { Button } from "@material-ui/core";
import idl from "./idl.json";

const Dummy = () => {

    const opts = {
        preflightCommitment: "processed"
    }
    const programId = new anchor.web3.PublicKey("6FZKYLfT1tUPN5CuyqUNWREcr3utyvbn5LR5urSpTqFe");
    const wallet = useWallet();
    const { connection } = useConnection();
    const notify = useNotify();
    const provider = new anchor.Provider(connection, wallet, opts.preflightCommitment);

    async function onClick() {
        /* create the program interface combining the idl, program ID, and provider */
        const program = new anchor.Program(idl, programId, provider);
        let sig;
        try {
            /* interact with the program via rpc */
            sig = await program.rpc.dummy();
            console.log("TX SIGNATURE -> ", sig);
            notify('info', 'Transaction sent:', sig);

            await connection.confirmTransaction(sig, 'processed');
            notify('success', 'Transaction successful!', sig);

        } catch (error) {
            console.log("Transaction error: ", error);
            notify('error', `Transaction failed! ${error.message}`, sig);
            return;
        }
    }


    return (
        <Button variant="contained" color="primary" onClick={onClick}>Call Dummy</Button>
    );
}

export default Dummy;