import { AddIcon, LinkIcon, ViewIcon } from "@chakra-ui/icons";
import { HStack, Text, Flex, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { Logo } from './Logo';
import NFTCreateModal from "./NFTCreateModal";


export default function Header({isConnected, isConnenting, address}) {
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
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    leftIcon={<AddIcon/>}
                    onClick={onOpenCreateNFT}>Create NFT</Button>
                <Button
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    leftIcon={<ViewIcon/>}>My Gallery</Button>
            </HStack>
            <Spacer/>
            <HStack g={0}>
                <ColorModeSwitcher/>
                <Text fontSize='large' boxSize={{base: 0}}>
                    {
                        address ? `Connected to ${address}` : ""
                    }
                </Text>
                <Button
                    isLoading={isConnenting}
                    loadingText="Loading"
                    size={{ base: 'md', md: 'md', lg: 'lg'}}
                    leftIcon={<LinkIcon/>}>
                        {
                            isConnected ? "Connected" : "Connect"
                        }
                    </Button>
            </HStack>
            <NFTCreateModal isOpen={isOpenCreateNFT} onClose={onCloseCreateNFT} />
        </Flex>
    )
}