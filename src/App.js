import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  useToast
} from '@chakra-ui/react';

import ProviderWrapper from './services/ProviderWrapper';
import ContractWrapper from './contract/ContractWrapper';
import { getMetadata, uploadJSON } from './services/IPFSService';

import Header from './components/Header';
import NFTGrid from './components/NFTGrid';

function App() {

  const toast = useToast({ duration: 3000, isClosable: true });
  const providerWrapper = new ProviderWrapper(onAccountsChanged);
  const contractWrapper = new ContractWrapper(providerWrapper.getSigner());

  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState('');
  useEffect(() => {
    onAccountsChanged();
  }, []);

  function connectToMetamask() {
    setConnecting(true);

    providerWrapper.connectToMetamask(() => {
      toast({ title: 'You are connected!' });
      setConnected(true);
      setConnecting(false);
    }, () => {
      toast({ title: 'Something went wrong!' });
      setConnected(false);
      setConnecting(false);
    })
  }

  function onAccountsChanged() {
    providerWrapper.isConnected().then((connected) => {
    setConnected(connected);

    if (connected) {
      const signer = providerWrapper.getSigner()
      signer.getAddress().then((address) => setAddress(address));
    } else {
      setAddress(null);
    }});
  }

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header/>
        <NFTGrid/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
