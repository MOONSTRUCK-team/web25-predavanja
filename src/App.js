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
import Counter from './counter/Counter';
import ProviderWrapper from './ProviderWrapper';

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
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
              <Button 
              leftIcon={<LinkIcon/>}
              p={4}
              color='teal'
              size='lg'
              disabled={connected}
              onClick={connectToMetamask}>Connect</Button>
              <Counter isConnected={connected} signer={providerWrapper.getSigner()} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
