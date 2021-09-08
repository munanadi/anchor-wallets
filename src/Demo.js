import { FormControlLabel, Switch, Table, TableBody, TableCell, TableRow, Tooltip } from '@material-ui/core';
import {
    WalletConnectButton as MaterialUIWalletConnectButton,
    WalletDialogButton as MaterialUIWalletDialogButton,
    WalletDialogProvider as MaterialUIWalletDialogProvider,
    WalletDisconnectButton as MaterialUIWalletDisconnectButton,
    WalletMultiButton as MaterialUIWalletMultiButton,
} from '@solana/wallet-adapter-material-ui';
import { ConnectionProvider, useLocalStorage, WalletProvider } from '@solana/wallet-adapter-react';
import {
    getPhantomWallet,
    getSolletWallet,
} from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo } from 'react';
import RequestAirdrop from './RequestAirdrop';
import SendTransaction from './SendTransaction';
import InitializeAccount from './InitializeAccount';
import CallDummy from './callDummy';

export const Demo = () => {
    // const endpoint = useMemo(() => clusterApiUrl('devnet'), []);
    // clusterApiUrl returns a string.
    const endpoint = "http://localhost:8899";
    const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);

    const wallets = useMemo(
        () => [
            getPhantomWallet(),
            getSolletWallet(),
        ],
        []
    );

    const { enqueueSnackbar } = useSnackbar();
    const onError = useCallback(
        (error) => {
            enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
            console.error(error);
        },
        [enqueueSnackbar]
    );

    // console.log(wallets)

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
                <MaterialUIWalletDialogProvider>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell> Connect Button
                                    <MaterialUIWalletConnectButton />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Disconnect Button
                                    <MaterialUIWalletDisconnectButton />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Dialog/Modal Button
                                    <MaterialUIWalletDialogButton />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Multi Button
                                    <MaterialUIWalletMultiButton />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Tooltip title="Only runs if the wallet is ready to connect" placement="left">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="autoConnect"
                                                    color="secondary"
                                                    checked={autoConnect}
                                                    onChange={(event, checked) => setAutoConnect(checked)}
                                                />
                                            }
                                            label="AutoConnect"
                                        />
                                    </Tooltip>
                                    <RequestAirdrop />
                                </TableCell>
                                <TableCell>
                                    <SendTransaction />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <InitializeAccount />
                                    <CallDummy />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </MaterialUIWalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
