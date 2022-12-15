import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Header from './Header';
import NFTGrid from './NFTGrid';

import uploadJSON  from './IPFS';

function App() {
  uploadJSON({"name": "Test2"});
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
