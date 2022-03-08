import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Verify } from "./components/VerifyButton";
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/ChiHaoLu/">
        ChiHaoLu
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#A63446',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#0C6291',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      paper: "#000004",
      default: "#000004"
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
      disabled: "rgba(0,0,0,0.12)"
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <IconButton sx={{ mr: 2 }} href="/" aria-label="home">
            <HomeIcon />
          </IconButton>
          <ViewInArTwoToneIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            KilliFish
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify" element={<Verify />} />
        </Routes >
      </Router>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          killifish.eth
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
         The best courses platform for learning web3!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}