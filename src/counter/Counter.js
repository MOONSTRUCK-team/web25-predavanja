import React, { useEffect, useState } from 'react';

import {
    Container, VStack, Text, Button, useToast
} from '@chakra-ui/react';

import CounterContract from './CounterContact';

export default function Counter({isConnected, signer}) {
    const [count, setCount] = useState(0);
    const toast = useToast({ duration: 4000, isClosable: true });

    const counterContract = new CounterContract(signer);

    function inclement() {
        counterContract.inclement(onSuccessCb, onErrorCb);
    }

    function declement() {
        counterContract.declement(onSuccessCb, onErrorCb);
    }

    function onSuccessCb(text) {
        getCounterValue();
        toast({ title: text });
    }

    function onErrorCb(error) {
        // https://docs.metamask.io/guide/ethereum-provider.html#errors
        // Check EIP-1193 userRejectedRequest error
        toast({ title: `${error.code}` });
    }

    useEffect(() => {
        getCounterValue();
    }, []);

    function getCounterValue() {
        counterContract.retrieveCountValue().then((value) => setCount(value));
    }


    if (isConnected) {
        return (
            <Container borderColor='teal.100' borderWidth={2} borderRadius={5} p={10} >
                <VStack gap={5}>
                    <Text fontSize='2xl'>Contract address is: {counterContract.getAddress()}</Text>
                    <Text fontSize='2xl'>Current count value: {count}</Text>
                    <Button size='lg' color='teal' onClick={inclement}>Inclement</Button>
                    <Button size='lg' color='teal' onClick={declement}>Declement</Button>
                </VStack>
            </Container>
        )
    }
}