import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    Flex,
    ButtonGroup,
    Link,
    Button,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import AddForm from './AddForm'
import { AlertDialogCustom } from './AlertDialogCustom'

const openModal = () => {

}


const AddCard = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Anunciar produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddForm />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' color={'black'} mr={5} onClick={onOpen}>
                            Anunciar o produto
                        </Button>
                        <Button bg={'#ff4545'} color={'black'}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card minW={'sm'} maxW={340} onClick={onOpen} bg={'white'} >
                <CardBody align="center" justify="center">
                    <AddIcon boxSize={36} />
                </CardBody>
                <Divider />
                <CardFooter alignSelf={'center'}>
                    <Text size={'lg'} fontSize={'x-large'}>
                        Adicionar produto
                    </Text>
                </CardFooter>
                <Text align={'center'}>
                    Clique aqui para adicionar um produto na loja
                </Text>
            </Card >
        </>
    )
}

export default AddCard