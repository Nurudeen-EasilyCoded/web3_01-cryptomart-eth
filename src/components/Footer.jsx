import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import logo1 from '../images/logo1.png';

const Footer = () => {
  return (
    <Container sx={{ p: 2 }}>
      <Grid
        container
        sx={{ p: 2, justifyContent: 'center' }}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} textAlign='center' sx={{ mb: 2 }}>
          <Box
            component='img'
            src={logo1}
            alt='logo'
            sx={{ width: { xs: '50%', sm: '15%', md: '20%' } }}
          />
        </Grid>
        <Grid item xs={3} textAlign='center'>
          <Typography variant='overline' color='white'>
            Market
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign='center'>
          <Typography variant='overline' color='white'>
            Exchange
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign='center'>
          <Typography variant='overline' color='white'>
            Spot
          </Typography>
        </Grid>
        <Grid item xs={3} textAlign='center'>
          <Typography variant='overline' color='white'>
            Wallet
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign='center' sx={{ mt: 5 }}>
          <Typography variant='caption' color='white'>
            @ copyright CryptoMart - All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
