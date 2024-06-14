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
    Container,
    Box,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    Select,
    FormErrorMessage
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { AlertDialogCustom } from './AlertDialogCustom'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const AddCard = () => {

    const navigate = useNavigate();

    const [nameProduct, setNameProduct] = useState('');
    const [descriptionProduct, setDescriptionProduct] = useState('');
    const [photoProduct, setPhotoProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState('');
    const [typeProduct, setTypeProduct] = useState('');
    const [sizeProduct, setSizeProduct] = useState('');

    const [nameProductError, setNameProductError] = useState('');
    const [descriptionProductError, setDescriptionProductError] = useState('');
    const [photoProductError, setPhotoProductError] = useState('');
    const [priceProductError, setPriceProductError] = useState('');
    const [typeProductError, setTypeProductError] = useState('');
    const [sizeProductError, setSizeProductError] = useState('');
    const [error, setError] = useState('');
    const { createProduct } = useAuth();

    const handleCreateProduct = async () => {

        // Reset errors
        setError('');
        setNameProductError('');
        setDescriptionProductError('');
        setPhotoProductError('');
        setPriceProductError('');
        setTypeProductError('');
        setSizeProductError('');

        // Basic validation
        if (!nameProduct) {
            setNameProductError('Nome do produto é obrigatório.');
            return;
        }

        if (!descriptionProduct) {
            setDescriptionProductError('descrição é obrigatório.');
            return;
        }

        if (!photoProduct) {
            photoProductError('Link da foto é obrigatório');
            return;
        }

        if (!priceProduct) {
            setPriceProductError('Preço é obrigatório.');
            return;
        }

        if (!typeProduct) {
            setTypeProductError('Tipo é obrigatório.');
            return;
        }

        if (!sizeProduct) {
            setSizeProductError('Tamanho é obrigatório.');
            return;
        }


        try {
            await createProduct(descriptionProduct, sizeProduct, typeProduct, nameProduct, photoProduct, priceProduct);
            alert(`produto cadastrado com sucesso!`)
            navigate('/store');
        } catch (error) {

            console.log("deu ruim", error);

        }
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Anunciar produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container
                            maxW="lg"
                            py={{
                                base: '12',
                                md: '8',
                            }}
                            px={{
                                base: '0',
                                sm: '8',
                            }}
                        >
                            <Box
                                py={{
                                    base: '0',
                                    sm: '8',
                                }}
                                px={{
                                    base: '4',
                                    sm: '10',
                                }}
                                bg={{
                                    base: 'transparent',
                                    sm: 'bg.surface',
                                }}
                                boxShadow={{
                                    base: 'none',
                                    sm: 'md',
                                }}
                                borderRadius={{
                                    base: 'none',
                                    sm: 'xl',
                                }}
                            >
                                <Stack spacing="6">
                                    <Stack spacing="5">
                                        <FormControl isInvalid={nameProductError}>
                                            <FormLabel htmlFor="nameProduct">Nome do produto</FormLabel>
                                            <Input id="nameProduct" type="nameProduct"
                                                value={nameProduct}
                                                onChange={(e) => {
                                                    setNameProduct(e.target.value);
                                                    setNameProductError('');
                                                }} />
                                            <FormErrorMessage>{nameProductError}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl isInvalid={descriptionProductError}>
                                            <FormLabel htmlFor="descriptionProduct">Descrição</FormLabel>
                                            <Input id="descriptionProduct" type="descriptionProduct"
                                                value={descriptionProduct}
                                                onChange={(e) => {
                                                    setDescriptionProduct(e.target.value);
                                                    setDescriptionProductError('');
                                                }} />
                                        </FormControl>
                                        <FormControl isInvalid={photoProductError}>
                                            <FormLabel htmlFor="photoProduct">Link de foto do produto</FormLabel>
                                            <Input id="photoProduct" type="photoProduct"
                                                value={photoProduct}
                                                onChange={(e) => {
                                                    setPhotoProduct(e.target.value);
                                                    setPhotoProductError('');
                                                }} />
                                        </FormControl>
                                        <FormControl isInvalid={priceProductError}>
                                            <FormLabel htmlFor="price">Valor</FormLabel>
                                            <NumberInput>
                                                <NumberInputField id="price" type="price"
                                                    value={priceProduct}
                                                    onChange={(e) => {
                                                        setPriceProduct(e.target.value);
                                                        setPriceProductError('');
                                                    }} />
                                            </NumberInput>
                                        </FormControl>
                                        <FormControl isInvalid={typeProductError}>
                                            <Select mt={6} placeholder='Tipo do produto'
                                                value={typeProduct}
                                                onChange={(e) => {
                                                    setTypeProduct(e.target.value);
                                                    setTypeProductError('');
                                                }}>
                                                <option value='roupa'>Roupa</option>
                                                <option value='calcado'>Calçado</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl isInvalid={sizeProductError}>
                                            <Select mt={6} placeholder='Tamanho'
                                                value={sizeProduct}
                                                onChange={(e) => {
                                                    setSizeProduct(e.target.value);
                                                    setSizeProductError('');
                                                }}>
                                                <option value='pp'>PP</option>
                                                <option value='P'>P</option>
                                                <option value='m'>M</option>
                                                <option value='g'>G</option>
                                                <option value='gg'>GG</option>
                                                <option value='32'>32</option>
                                                <option value='33'>33</option>
                                                <option value='34'>34</option>
                                                <option value='35'>35</option>
                                                <option value='36'>36</option>
                                                <option value='37'>37</option>
                                                <option value='38'>38</option>
                                                <option value='39'>39</option>
                                                <option value='40'>40</option>
                                                <option value='41'>41</option>
                                                <option value='42'>42</option>
                                                <option value='43'>43</option>
                                                <option value='44'>44</option>
                                                <option value='45'>45</option>
                                                <option value='46'>46</option>
                                                <option value='47'>47</option>
                                                <option value='48'>48</option>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Container>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' color={'black'} mr={5} onClick={handleCreateProduct}>
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