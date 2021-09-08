const { Program, Wallet, web3, BN } = require('@project-serum/anchor');

// This works. Calling from the node side.
(async () => {

    // Read the generated IDL.
    const idl = JSON.parse(require('fs').readFileSync('./idl.json', 'utf8'));
    // console.log(idl)
    // Address of the deployed program.
    const programId = new web3.PublicKey('6FZKYLfT1tUPN5CuyqUNWREcr3utyvbn5LR5urSpTqFe');
    // console.log(programId)
    // Generate the program client from IDL.
    const program = new Program(idl, programId);
    // console.log(program)
    // Execute the RPC.
    const tx = await program.rpc.dummy();
    console.log(tx);
})();