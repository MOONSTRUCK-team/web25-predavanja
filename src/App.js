import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button,
  useToast
} from '@chakra-ui/react';

import {
  LinkIcon
} from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import ProviderWrapper from './ProviderWrapper';
import Header from './Header';
import NFTGrid from './NFTGrid';

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
