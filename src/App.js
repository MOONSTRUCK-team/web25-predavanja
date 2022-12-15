import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Header from './Header';
import NFTGrid from './NFTGrid';

function App() {
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
