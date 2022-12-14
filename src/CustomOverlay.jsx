import { ModalOverlay } from "@chakra-ui/react";

export default function CustomOverlay() {
    return (
        <ModalOverlay bg='blackAlpha.400' backdropFilter='blur(5px) hue-rotate(10deg)'/>
    )
}