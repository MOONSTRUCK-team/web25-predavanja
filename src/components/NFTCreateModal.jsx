import { 
    FormControl,
    FormLabel, 
    Field,
    Input, 
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@chakra-ui/react";
import { useState } from "react";
import CustomOverlay from "./CustomOverlay";

export default function NFTCreateModal({isOpen, onCreateNFT, onClose}) {
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    function handleCreateNFT(e) {
        e.preventDefault();
        onCreateNFT(description, imageURL);
        onClose();
    }
    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            isCentered>
        <CustomOverlay/>
        <ModalContent>
            <ModalHeader>Create NFT</ModalHeader>
            <ModalCloseButton/>
            <form onSubmit={handleCreateNFT}>
            <ModalBody>
                <FormControl p={4} isRequired>
                    <FormLabel>Description</FormLabel>
                    <Input 
                        placeholder='Snowy day'
                        onChange={e => setDescription(e.currentTarget.value)}
                        />
                </FormControl>
                <FormControl p={4} isRequired>
                    <FormLabel>Image URL</FormLabel>
                    <Input 
                    placeholder='https://unsplash.com/124'
                    onChange={e => setImageURL(e.currentTarget.value)}
                    />
                </FormControl>
            
            </ModalBody>
            <ModalFooter>
                <Button 
                size='lg'
                p={3}
                width='full'
                type='submit'>Create</Button>
            </ModalFooter>
            </form>
        </ModalContent>
        </Modal>
    )
}