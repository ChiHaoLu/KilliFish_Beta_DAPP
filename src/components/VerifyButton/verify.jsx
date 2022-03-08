import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useState } from "react";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import * as web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NFTE } from '@nfte/react';

const provider = new web3.providers.HttpProvider('https://mainnet.infura.io')

const seaport = new OpenSeaPort(provider, {
    networkName: Network.Main
})

const ERCTypes = [
    {
        value: 'ERC20',
        label: 'ERC-20 (Constructing)',
    },
    {
        value: 'ERC721',
        label: 'ERC-721 ',
    },
    {
        value: 'ERC1155',
        label: 'ERC-1155 (Constructing)',
    },
];

const Classes = [
    {
        value: '0x67d9417c9c3c250f61a83c7e8658dac487b56b09',
        label: 'DApp and Smart Contract Development (PHANTA BEAR)',
        // PHANTA BEAR: https://etherscan.io/address/0x67d9417c9c3c250f61a83c7e8658dac487b56b09
    },
    {
        value: 'smartcontract_address_2',
        label: 'Enterprise-level Consortium Blockchain Development (Constructing)',
    },
    {
        value: 'smartcontract_address_3',
        label: 'Underlying Architecture of Blockchain (Constructing)',
    },
];

export function MyVerify(props) {
    const [erc, setERC] = useState('ERC721');
    const [myclass, setClass] = useState('0x67d9417c9c3c250f61a83c7e8658dac487b56b09');
    const [values, setValues] = useState({
        id: ""
    });
    // tokenId: 7476 -- https://opensea.io/assets/0x67d9417c9c3c250f61a83c7e8658dac487b56b09/7476
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState("0x27b00e6109f246d9d42aaf4a12f0ae35fc4bde71");
    // owner of 7476: https://opensea.io/0x27b00e6109f246d9d42aaf4a12f0ae35fc4bde71
    const [ownership, setOwnerShip] = useState(false)
    const [fetching, setFetching] = useState(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleChange_ERC = (event) => {
        setERC(event.target.value);
    };

    const handleChange_Class = (event) => {
        setClass(event.target.value);
    };

    // useEffect(() => {
    //     window.ethereum
    //         .request({ method: 'eth_requestAccounts' })
    //         .then((newAccounts) => setAccount(newAccounts[0]));
    // }, []);

    const fetchData = async () => {
        // 使用 await 等待 API 取得回應後才繼續
        const balance = await seaport.getAssetBalance({
            accountAddress: account,
            asset: {
                tokenAddress: myclass,
                tokenId: values.id,
                schemaName: erc
            },
        })
        console.log(balance.toString());
        (balance.toString() === "1" ? setOwnerShip(true) : setOwnerShip(false));
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Select ERC"
                        value={erc}
                        onChange={handleChange_ERC}
                        helperText="Please select your ERC"
                        variant="filled"
                    >
                        {ERCTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="filled-select-class"
                        select
                        label="Select Class"
                        value={myclass}
                        onChange={handleChange_Class}
                        helperText="Please select your Classes"
                        variant="filled"
                    >
                        {Classes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-id">Your Certificate ID</InputLabel>
                    <Input
                        id="standard-adornment-id"
                        value={values.id}
                        onChange={handleChange('id')}
                        startAdornment={<InputAdornment position="start">ID - </InputAdornment>}
                    />
                </FormControl>
                <Button sx={{ m: 2, width: '26.5ch' }}
                    onClick={() => {
                        setFetching(true);
                        setTimeout(() => {
                            setFetching(false);
                        }, 5000);
                        console.log(erc, myclass, account, values.id);
                        fetchData();
                        setOpen(true)
                    }}
                    variant="contained">Verify</Button>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={open && ownership && !fetching}>
                        <Alert
                            severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Verify Successfully!
                        </Alert>
                        <NFTE 
                            contract={myclass}
                            tokenId={values.id}
                            darkMode={true} />
                    </Collapse>
                    <Collapse in={open && fetching}>
                        <Alert
                            severity="info"
                            sx={{ mb: 2 }}
                            icon={<AccessTimeIcon fontSize="inherit" />}
                        >
                            Now Verifying...
                        </Alert>
                    </Collapse>
                    <Collapse in={open && !ownership && !fetching}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Verify Failed!
                        </Alert>
                    </Collapse>
                </Box>
            </Box>
        </div>
    );
}
