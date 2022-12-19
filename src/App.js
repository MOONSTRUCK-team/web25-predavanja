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
  const contractWrapper = new ContractWrapper(providerWrapper.provider);

  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [minting, setMinting] = useState(false);
  const [address, setAddress] = useState('');
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    onAccountsChanged();
  }, []);


  useEffect(() => {
    loadNftData();
  }, []);

  function handleOnCreateNFT(description, imageURL) {
    setMinting(true);

    const metadataJSON = {
      description: description,
      image: imageURL
    };

    const fileName = address + '-' + Math.round((new Date()).getTime() / 1000);

    uploadJSON(fileName, metadataJSON, (cid) => {
      contractWrapper.mint(
        providerWrapper.getSigner(),
        cid,
        (message, isMinted) => {
          toast({ title: message });
          setMinting(!isMinted);

          if (isMinted) {
            loadNftData();
          }
        }, (errorMsg) => {
          toast({ title: errorMsg });
        }
      );
    });
  }

  function loadNftData() {
    contractWrapper.getTokenCount()
    .then((count) => {
      // Form array of token IDs
      const tokenIDs = Array.from({length: count}, (_, index) => index + 1);
      // Form array of req for token details
      const tokenDetailsRequests = tokenIDs.map((tokenID) => contractWrapper.getTokenDetails(tokenID));

      Promise.all(tokenDetailsRequests)
      .then((tokenDetails) => {
        // Form array of req for token metadata
        const metadataURLRequests = tokenDetails.map((detail) => getMetadata(detail.uri));
        Promise.all(metadataURLRequests)
        .then((metadata) => {
          formNFTData(tokenIDs, tokenDetails, metadata);
        });
      });
    })
  }

  function formNFTData(tokenIDs, tokenDetails, metadata) {
    const newNFTData = [];

    tokenIDs.forEach((tokenID, index) => {
      const item = {
        tokenId: tokenID,
        owner: tokenDetails[index].owner,
        imageURL: metadata[index].image,
        description: metadata[index].description
      };

      newNFTData.push(item);
    });

    setNftData(newNFTData);
  }

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
      const signer = providerWrapper.getSigner();
      signer.getAddress().then((address) => setAddress(address));
    } else {
      setAddress(null);
    }});
  }

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header 
          isMinting={minting}
          isConnected={connected}
          isConnecting={connecting}
          address={address}
          onConnectClicked={connectToMetamask}
          onCreateNFT={handleOnCreateNFT}/>
        <NFTGrid nftData={nftData}/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
