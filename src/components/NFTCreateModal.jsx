import { FormControl, FormLabel, Input, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import CustomOverlay from "./CustomOverlay";

export default function NFTCreateModal({isOpen, onClose}) {
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
        <CustomOverlay/>
        <ModalContent>
            <ModalHeader>Create NFT</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <FormControl p={4}>
                    <FormLabel>Description</FormLabel>
                    <Input placeholder='Snowy day'></Input>
                </FormControl>
                <FormControl p={4}>
                    <FormLabel>Image URL</FormLabel>
                    <Input placeholder='https://unsplash.com/124'></Input>
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button 
                size='lg'
                p={3}
                >Create</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    )
}