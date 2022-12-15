import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  useToast
} from '@chakra-ui/react';

import ProviderWrapper from './services/ProviderWrapper';
import Header from './components/Header';
import NFTGrid from './components/NFTGrid';

function App() {
  const [connected, setConnected] = useState(false);
  const toast = useToast({ duration: 4000, isClosable: true });

  const providerWrapper = new ProviderWrapper(onAccountsChanged);

  useEffect(() => {
    onAccountsChanged();
  }, []);

  function connectToMetamask() {
    providerWrapper.connectToMetamask(() => {
      toast({ title: 'We are connected'});
      setConnected(true);
    }, () => {
      toast({ title: 'Something went wrong!'});
      setConnected(false);
    })
  }

  function onAccountsChanged() {
    providerWrapper.isConnected().then((connected) => setConnected(connected));
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
