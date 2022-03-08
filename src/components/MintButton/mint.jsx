import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

export function MintButton() {
    const [claiming, setClaiming] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);

    useEffect(() => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    }, [blockchain.smartContract, dispatch]);

    const claimNFTs = (_amount) => {
        setClaiming(true);
        blockchain.smartContract.methods.KFmint(blockchain.account, _amount).send({
            from: blockchain.account,
            value: blockchain.web3.utils.toWei((0.06 * _amount).toString(), "ether"),
        }).once("error", (err) => {
            setFeedback("Error")
            setClaiming(false);
        }).then((receipt) => {
            setFeedback("Success")
            setClaiming(false);
        })
    };

    return (
        <div>
            {blockchain.account === "" || blockchain.smartContract === null ? (
                <Button
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                    }} >
                    {"Connect to Blockchain!"}
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    disabled={claiming}
                    onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                    }} >
                    {claiming ? "Claiming Now..." : "Mint a New Certificate!"}
                </Button>
            )}
        </div>
    );
}