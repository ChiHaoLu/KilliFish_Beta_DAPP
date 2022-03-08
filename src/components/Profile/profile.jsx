import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MetaMaskOnboarding from '@metamask/onboarding';
import { useEffect, useState } from "react";
import Container from '@mui/material/Container';
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function MyProfile() {
    const [expanded, setExpanded] = useState(false);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        function handleNewAccounts(newAccounts) {
            setAccounts(newAccounts);
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts);
            window.ethereum.on('accountsChanged', handleNewAccounts);
            console.log(accounts[0]);
            setAccounts(accounts[0])
            // return () => {
            //   window.ethereum.off('accountsChanged', handleNewAccounts);
            // };
        }
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Container sx={{ py: 6 }} maxWidth="md">
            <Card sx={{ maxWidth: 555 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "#A63446" }} aria-label="recipe">
                            0x
                        </Avatar>
                    }
                    
                    title={accounts}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        兔美。<br /> 小學生，是一隻兔子，有名偵探的美稱，在有靈感（分析出「重要」案情時）的時候目光會變得銳利。
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton href="/" aria-label="home" color="secondary">
                        <SchoolIcon />
                    </IconButton>
                    <IconButton href="/verify" aria-label="check" color="secondary">
                        <FactCheckIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        color="secondary"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>《搞笑漫畫日和》</Typography>
                        <Typography paragraph>
                            《搞笑漫畫日和》（日語：ギャグマンガ日和）是日本漫畫家増田こうすけ創作的日本漫畫作品。於集英社漫畫雜誌《月刊少年JUMP》2000年1月號開始連載。之後因為雜誌休刊的關係，改為《Jump Square》，連載至2015年12月號完結。單行本全15卷。現在改標題為《搞笑漫畫日和GB》（ギャグマンガ日和GB）於《Jump Square》上連載。

                            動畫共有四部，最新的一部是為紀念漫畫連載11周年於2010年1月開始播放的第4季動畫「搞笑漫畫日和+」。每集動畫的長度約為5分鐘。
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Container>
    );
}
