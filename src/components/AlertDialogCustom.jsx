import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    Flex,
} from '@chakra-ui/react'

import React from 'react'

export const AlertDialogCustom = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Tem certeza?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Tem certeza
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button onClick={onClose}>
                                Confirmar
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Cancelar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}