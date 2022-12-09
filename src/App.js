import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  HStack,
  Input,
  useToast,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import { ethers } from 'ethers';

import { signer, provider } from './provider';

function App() {
  const toast = useToast();

  const [balance, setBalance] = useState(0);
  const [invalidAddress, setInvalidAddress] = useState(true);
  const [address, setAddress] = useState();

  function getBalance(address) {
    if (ethers.utils.isAddress(address)) {
      setInvalidAddress(true);

      provider.getBalance(address).then(value => {
        setBalance(value.toString());
      });

      provider.getTransactionCount(address).then(no => {
        console.log(`ova adresa je napravila ${no} tranzakcija`)
      })
    } else {
      setInvalidAddress(false);
    }
  }

  useEffect(() => {
    provider.getBlock(2314).then(block => {
      console.log(block)
    })

    setInterval(() => {
      signer.getAddress().then(_address => setAddress(_address));
    }, 2000);

    provider.getNetwork().then(network => {
      if (network.chainId !== 97) toast({
        title: 'Wrong network',
        description: 'Change your network to BSC testnet',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    });

    provider.getBlockNumber().then(blockNo => {
      console.log(`trenutni blok je ${blockNo}`)
    });

    provider.getGasPrice().then(price => {
      console.log(`trenutna cena gasa na mrezi je ${price} wei-ja`);
    });
  }, [])

  function sendBNB() {
    signer.sendTransaction({
      to: '0x2fD4486241dFC566193314E7e268C2CA6b8cc6a3',
      value: ethers.constants.WeiPerEther
    }).then(tx => {
      tx.wait().then(confirmation => {
        toast({
          title: 'Transaction confirmed',
          description: tx.hash,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      });
    });
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Box
            style={{
              borderWidth: '1px',
              borderRadius: '3px',
              borderColor: 'black',
            }}
            w={400}
            p={10}
          >
            <HStack>
              <Text>Trenutna adresa: {address}</Text>
            </HStack>
            <HStack spacing={5}>
              <Input
                onChange={event => getBalance(event.target.value)}
                placeholder="Unesite adresu"
                size="sm"
              />
              <Text color={!invalidAddress ? 'red' : 'green'}>
                {!invalidAddress ? 'Invalid address' : balance}
              </Text>
            </HStack>
            <Button onClick={sendBNB}>Send</Button>
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
