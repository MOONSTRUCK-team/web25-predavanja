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
                    size='lg'
                    leftIcon={<AddIcon/>}
                    onClick={onOpenCreateNFT}>Create NFT</Button>
                <Button
                    size='lg'
                    leftIcon={<ViewIcon/>}>My Gallery</Button>
            </HStack>
            <Spacer/>
            <HStack>
                <ColorModeSwitcher/>
                <Text fontSize='large'>
                    {
                        address ? `Connected to ${address}` : ""
                    }
                </Text>
                <Button
                    isLoading={isConnenting}
                    loadingText="Loading"
                    size='lg'
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