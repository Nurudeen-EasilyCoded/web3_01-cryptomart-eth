import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  CardActions,
  Divider,
  LinearProgress,
  Typography,
  TextField,
  Stack,
} from '@mui/material';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { RiExchangeFill } from 'react-icons/ri';
import { GiReceiveMoney } from 'react-icons/gi';
import { GiCardExchange } from 'react-icons/gi';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

const borderGradient =
  'conic-gradient(cyan, cyan, magenta, aqua, blue, magenta, aqua) 1';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <TextField
    hiddenLabel
    id='filled-hidden-label-small'
    variant='filled'
    size='small'
    placeholder={placeholder}
    type={type}
    name={name}
    step='0.0001'
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const Header = () => {
  const {
    connectWallet,
    connectedAccount,
    handleFormInputChange,
    formValue,
    setFormValue,
    sendTransaction,
    isLoading,
    transactionSentAlert,
    transactions
  } = useContext(TransactionContext);

  let totalEthereum = transactions.map((eth) => eth.amount).reduce((a, c) => { return a + c }, 0);

  const submitTransaction = (event) => {
    const { addressTo, amount, message } = formValue;
    event.preventDefault();
    
    if (!addressTo || !amount || !message) {
      return;
    } else {
      sendTransaction();
    }
  };

  return (
    <Container sx={{ mt: { xs: 5, md: 15 } }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 5, md: 12 }}>
        <Grid item md={6} xs={12}>
          <Box sx={{ p: 2 }}>
            <Card
              raised={true}
              className='ethCard-bg-gradient'
              sx={{
                maxWidth: 420,
                margin: '0px auto',
                height: { xs: 170, sm: 180, md: 200 },
              }}>
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                }}>
                <Box
                  sx={{
                    textAlign: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    border: '1px solid white',
                  }}>
                  <SiEthereum
                    style={{ fontSize: 40, color: '#d8d8d8', marginTop: '5px' }}
                  />
                </Box>
                <Box>
                  <BsInfoCircle color='white' fontSize='25px' />
                </Box>
              </CardContent>
              <CardActions
                sx={{ marginTop: { xs: '0px', sm: '5px', md: '20px' } }}>
                <Stack direction='column'>
                  <Typography color='#eee000' variant='caption'>
                    Wallet Address
                  </Typography>
                  <Typography color='white'>
                    {shortenAddress(connectedAccount)}
                  </Typography>
                  <Typography color='#eee000' variant='caption'>
                    Total Sent
                  </Typography>
                  <Typography color='white' gutterBottom>
                    {totalEthereum} <b>ETH</b>
                  </Typography>
                </Stack>
              </CardActions>
            </Card>
          </Box>
          <Box sx={{ p: 2 }}>
            {connectedAccount ? (
              <Typography
                variant='h6'
                sx={{ mb: 5, color: 'lime', textAlign: 'center' }}>
                METAMASK WALLET IS CONNECTED!
              </Typography>
            ) : (
              <Button
                sx={{
                  mb: 5,
                  borderRadius: 10,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                onClick={connectWallet}
                fullWidth
                variant='contained'>
                Connect Wallet
              </Button>
            )}
            <Stack
              direction='row'
              justifyContent='space-between'
              divider={<Divider orientation='vertical' flexItem color='gray' />}
              spacing={2}>
              <Box
                sx={{
                  textAlign: 'center',
                  width: 80,
                  height: 80,
                  border: '3px solid',
                  borderRadius: '100px',
                  borderImage: borderGradient,
                }}>
                <Box sx={{ mt: 1 }}>
                  <Typography color='white' variant='subtitle1' gutterBottom>
                    Transfer
                  </Typography>
                  <RiExchangeFill style={{ fontSize: 30, color: 'white' }} />
                </Box>
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  width: 80,
                  height: 80,
                  border: '3px solid',
                  borderRadius: '100px',
                  borderImage: borderGradient,
                }}>
                <Box sx={{ mt: 1 }}>
                  <Typography color='white' variant='subtitle1' gutterBottom>
                    Receive
                  </Typography>
                  <GiReceiveMoney style={{ fontSize: 30, color: 'white' }} />
                </Box>
              </Box>
              <Box
                sx={{
                  textAlign: 'center',
                  width: 80,
                  height: 80,
                  border: '3px solid',
                  borderRadius: '100px',
                  borderImage: borderGradient,
                }}>
                <Box sx={{ mt: 1 }}>
                  <Typography color='white' variant='subtitle1' gutterBottom>
                    Trade
                  </Typography>
                  <GiCardExchange style={{ fontSize: 30, color: 'white' }} />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={{ p: 2 }}>
            <Typography
              className='text-gradient'
              gutterBottom
              variant='h4'
              fontWeight='bold'>
              Transfer Crypto <br /> across the world
            </Typography>
            <Typography color='white' variant='subtitle1' gutterBottom>
              Buy and sell cryptocurrencies easily on CryptoMart
            </Typography>
          </Box>
          {/* form */}
          <Stack
            className='form-bg-gradient'
            //component='form'
            sx={{ padding: '12px', borderRadius: 2, m: 1, mb: 10 }}
            spacing={2}
            noValidate
            autoComplete='off'>
            <Input
              placeholder='Address to'
              name='addressTo'
              type='text'
              handleChange={handleFormInputChange}
            />
            <Input
              placeholder='Amount (ETH)'
              name='amount'
              type='number'
              handleChange={handleFormInputChange}
            />
            <Input
              placeholder='Enter message'
              name='message'
              type='text'
              handleChange={handleFormInputChange}
            />
            {<Divider orientation='horizontal' flexItem />}
            {!isLoading ? (
              <button
                type='button'
                className='button'
                onClick={submitTransaction}>
                <div
                  style={{ fontSize: '16px', fontWeight: 600, padding: '5px' }}>
                  Send now
                </div>
              </button>
            ) : (
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color='secondary' />
                <LinearProgress color='success' />
                <LinearProgress color='primary' />
                <Typography>
                  ...Sending <small>(please do not refresh)</small>
                </Typography>
              </Stack>
            )}
            {transactionSentAlert && (
              <Alert severity='success'>Transaction completed!</Alert>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Header;
