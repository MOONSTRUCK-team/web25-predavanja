import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import NFTCard from "./NFTCard";
import NFTDetailsModal from "./NFTDetailModal";

import testData from './testData.json';

export default function NFTGrid() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState({});

    function handleItemSelected(item) {
        setSelectedItem(item);
        onOpen();
    }

    return (
        <SimpleGrid
            pt={100}
            px={10}
            spacing={10}
            minChildWidth={300}
            >
            {
            testData.map((item) => 
                <NFTCard
                    key={item.tokenId}
                    tokenID={item.tokenId}
                    imageURL={item.imageURL}
                    onItemSelected={() => handleItemSelected(item)}/>)
            }
            <NFTDetailsModal 
                isOpen={isOpen}
                onClose={onClose}
                data={selectedItem}
            />
        </SimpleGrid>
    )
}