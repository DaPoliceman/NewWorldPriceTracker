import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchBar from './SearchBar'
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import Check from '@mui/icons-material/Check';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

import './style.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Header = ({setShowApiOverlay}) => {
  return(
  <ThemeProvider theme={darkTheme}>
    <AppBar fill="true" bg="dark" variant="dark" fixed="top">
      <Toolbar>
       <Grid
         justify="space-between"
          container

        >
        <Grid item xs={3}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', float:"left" } }}
          >
            New World Money Maker
          </Typography>
          </Grid>
          <Grid item xs={7}>
            <SearchBar />
          </Grid>
          <Grid item xs={2}>
            <AddIcon onClick={() => {setShowApiOverlay();}} fontSize="large" sx={{ display: {float:"right", cursor: "pointer" } }}  />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  </ThemeProvider>
  );
}

export default Header;
