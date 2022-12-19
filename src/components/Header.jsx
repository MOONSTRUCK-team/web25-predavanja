import { AddIcon, LinkIcon, ViewIcon } from "@chakra-ui/icons";
import { HStack, Text, Flex, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { Logo } from './Logo';
import NFTCreateModal from "./NFTCreateModal";

function shrinkAddress(address) {
    return address.substring(0,6) + '...' + address.substring(38,42);
}

export default function Header({ onCreateNFT, isMinting, isConnected, isConnecting, onConnect, address }) {
    const { 
        isOpen: isOpenCreateNFT,
        onOpen: onOpenCreateNFT,
        onClose: onCloseCreateNFT
     } = useDisclosure();

    return (
        <Flex
            width='100%'
            padding={4}
            position='fixed'
            backgroundColor={'gray.600'}
            zIndex={100}>
            <HStack
                gap={2}>
                <Logo/>
                <Button
                    isLoading={isMinting}
                    loadingText="Minting..."
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    leftIcon={<AddIcon/>}
                    disabled={!isConnected}
                    onClick={onOpenCreateNFT}>Create NFT</Button>
                <Button
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    disabled={!isConnected}
                    leftIcon={<ViewIcon/>}>My Gallery</Button>
            </HStack>
            <Spacer/>
            <HStack g={0}>
                <ColorModeSwitcher/>
                <Text fontSize='large' textColor='white' >
                    {
                        address ? `${shrinkAddress(address)}` : ""
                    }
                </Text>
                <Button
                    isLoading={isConnecting}
                    loadingText="Loading..."
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    leftIcon={<LinkIcon/>}
                    onClick={onConnect}>
                        {
                            isConnected ? "Connected" : "Connect"
                        }
                    </Button>
            </HStack>
            <NFTCreateModal 
                isOpen={isOpenCreateNFT}
                onClose={onCloseCreateNFT}
                onCreateNFT={onCreateNFT}/>
        </Flex>
    )
}