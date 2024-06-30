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
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Icon,
    createIcon,
    Badge
} from '@chakra-ui/react'
import { Ratings } from './Ratings'
import { useState } from 'react'
import { FaInstagram } from "react-icons/fa"
import instagram from "../assets/instagram.svg"
import whatsapp from "../assets/whatsapp.svg"

const InstagramIcon = createIcon({
    displayName: 'InstagramIcon',
    viewBox: '0 0 200 200',  // Ajuste o viewBox conforme necessário
    path: (
        <image href={instagram} width="100%" height="100%" />
    ),
});

const WhatsappIcon = createIcon({
    displayName: 'WhatsappIcon',
    viewBox: '0 0 200 200',  // Ajuste o viewBox conforme necessário
    path: (
        <image href={whatsapp} width="100%" height="100%" />
    ),
});

const ProductCard = ({ name, img, description, types, clickOnLink, instagram, phone, price }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <Card maxW='sm' bgGradient='linear(to-t, #91ffff, white)'>
            <Text bg={'#ff91d7'} align={'center'} fontSize={'large'} fontWeight={700}>
                {name}
            </Text>
            <Divider />
            <CardBody align={'center'} position="relative">
                <Image
                    src={img}
                    borderRadius='lg'
                    maxH={225}
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'></Heading>
                    <Text>
                        {description}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Flex justifyContent="space-around" width="100%">
                    <Badge ml='1' fontSize={14} colorScheme='purple'>
                        {types}
                    </Badge>
                    <Badge ml='1' fontSize={14} colorScheme='green'>
                        R$ {price}
                    </Badge>
                </Flex>
            </CardFooter>
            <Divider />
            <Flex dir='row' justify={'space-between'} bg={'white'}>
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="sm" onClick={clickOnLink}>
                    Adicionar ao carrinho
                </Link>
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="sm" onClick={onOpen}>
                    Falar com a loja
                </Link>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Formas de contato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction={'column'}>
                            <Text mb={20} align={'center'}>Clique na opção desejada para começar uma conversa</Text>

                            <Text fontSize={14} align={'center'} mb={4}>Para acessar o perfil no Instagram: </Text>
                            <Flex mb={10} alignItems="center" justifyContent={'center'} direction={'row'}>

                                <Link href={`https://www.instagram.com/${instagram}`} isExternal>
                                    <Text fontSize={18}>@{instagram}</Text>
                                </Link>
                                <InstagramIcon boxSize={10} ml={4} />
                            </Flex>
                            <Text fontSize={14} align={'center'} mb={4}>Para entrar em contato pelo WhatsApp: </Text>
                            <Flex alignItems="center" justifyContent={'center'} direction={'row'}>

                                <Link href={`https://wa.me/${phone}`} isExternal>
                                    <Text fontSize={18}>{phone}</Text>
                                </Link>
                                <WhatsappIcon boxSize={10} ml={4} />
                            </Flex>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card >
    )
}

export default ProductCard