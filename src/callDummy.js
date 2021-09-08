import * as anchor from "@project-serum/anchor";
import { Provider } from "@project-serum/anchor";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { Button } from "@material-ui/core";
import idl from "./idl.json";

const Home = () => {

    const programId = new anchor.web3.PublicKey(
        "6FZKYLfT1tUPN5CuyqUNWREcr3utyvbn5LR5urSpTqFe"
    );
    const opts = {
        preflightCommitment: "recent",
    };
    const network = "http://127.0.0.1:8899";
    const wallet = new PhantomWalletAdapter();
    const connection = new anchor.web3.Connection(network, opts.preflightCommitment);

    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    const program = new anchor.Program(idl, programId, provider);
    wallet.connect();
    // console.log(wallet)
    // console.log(program)
    const toggleState = async () => {
        const tx = await program.rpc.dummy({
            signers: [],
        });
        console.log(tx)
    };

    return (
        <Button variant="contained" color="primary" onClick={toggleState}>call dummy</Button>
    );
}

export default Home;