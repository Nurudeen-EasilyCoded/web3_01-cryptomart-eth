import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState([]);
  const [transactionSentAlert, setTransactionSentAlert] = useState(false);

  const initialFormValue = {
    addressTo: '',
    amount: '',
    message: '',
  };
  const [formValue, setFormValue] = useState(initialFormValue);
  const handleFormInputChange = (event, name) => {
    setFormValue((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum)
        return alert('(PC ONLY) Please install MetaMask and connect your wallet');
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum)
        return alert('(PC ONLY) Please install MetaMask and connect your wallet');
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log('No accounts found. Please connect a wallet');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object.');
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum)
        return alert('(PC ONLY) Please install MetaMask and connect your wallet');
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum)
        return alert('(PC ONLY) Please install MetaMask and connect your wallet');

      const { addressTo, amount, message } = formValue;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x5208', //21000 GWEI, 0.00002 ETH
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      );

      setIsLoading(true);
      console.log(`...Sending - ${transactionHash.hash}`);
      await transactionHash.wait();

      setIsLoading(false);
      setTransactionSentAlert(true);
      setFormValue(initialFormValue);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
    } catch (error) {
      console.log(error);
      throw new Error('No Ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        sendTransaction,
        handleFormInputChange,
        formValue,
        setFormValue,
        transactions,
        isLoading,
        transactionSentAlert,
      }}>
      {children}
    </TransactionContext.Provider>
  );
};
