import { Card, CardBody, Center, Heading, Image, VStack } from "@chakra-ui/react";

export default function NFTCard({tokenID, imageURL, onItemSelected}) {
    return (
        <Card
            backgroundColor='gray.200'
            onClick={onItemSelected}
            _hover={{ cursor: 'grab', bg: 'gray.300', color: 'white' }}>
            <CardBody>
                <Center>
                    <Image
                        maxH={300}
                        src={imageURL}
                        borderRadius='lg'/>
                </Center>
                <VStack>
                    {/* TODO Add Highlight component */}
                    <Heading 
                        mt={5}
                        size='lg'
                        textColor='black'>NFT ID {tokenID}</Heading>
                </VStack>
            </CardBody>
        </Card>
    )
}