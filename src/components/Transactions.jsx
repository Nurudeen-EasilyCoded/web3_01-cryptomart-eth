import React, { useContext } from 'react';
import { Box, Chip, Grid, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dummyData from '../utils/dummyData';
import { TransactionContext } from '../context/TransactionContext';
import { shortenAddress } from '../utils/shortenAddress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body1,
  width: '100%',
  color: theme.palette.text.secondary,
}));

const Transactions = () => {
  const { connectedAccount, transactions } = useContext(TransactionContext);
  let recentTransactions = connectedAccount;

  return (
    <Box>
      <Box sx={{ mb: 1 }}>
        {recentTransactions ? (
          <Box>
            <Typography
              variant='h5'
              sx={{ color: 'white', textAlign: 'center', mb: 5, mt: 3 }}>
              Recent Transactions
            </Typography>
          </Box>
        ) : (
          <Box sx={{ px: 5 }}>
            <Typography
              variant='h6'
              sx={{ color: 'white', textAlign: 'center', mb: 5, mt: 3 }}>
              Connect Your Account To See Recent Transactions
            </Typography>
          </Box>
        )}
        <Box px={{ xs: 3, sm: 5, md: 5, lg: 10 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {recentTransactions &&
              transactions.reverse().map((transaction, index) => (
                <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                  <Item>
                    <Stack sx={{ p: 1 }}>
                      <a
                        href={`https://goerli.etherscan.io/address/${transaction.addressFrom}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        From: {shortenAddress(transaction.addressFrom)}
                      </a>
                      <a
                        href={`https://goerli.etherscan.io/address/${transaction.addressTo}`}
                        target='_blank'
                        rel='noopener noreferrer'>
                        To: {shortenAddress(transaction.addressTo)}
                      </a>
                      <a>Amount: {transaction.amount} ETH</a>
                      {transaction.message && (
                        <a>Message: {transaction.message}</a>
                      )}
                      <Box sx={{ mt: 1, textAlign: 'center' }}>
                        <Chip
                          sx={{ width: '50%' }}
                          label={transaction.timestamp}
                        />
                      </Box>
                    </Stack>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Box
          sx={{ border: '1px solid gray', mt: 8, mx: { xs: 5, sm: 5, md: 30 } }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
