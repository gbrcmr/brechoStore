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
    Button
} from '@chakra-ui/react'
import { Ratings } from './Ratings'
import { useState } from 'react'



const ProductCard = ({ name, img, description, types, clickOnLink }) => {

    // let arrayProdId = []

    // arrayProdId.push(prodId)

    // console.log(arrayProdId)

    // const handleCart = () => {
    //     window.location.href = "../cart";
    // }


    return (
        <Card maxW='sm' bg={'#2de2e6'} >
            <Text bg={'#9700cc'} align={'center'} fontSize={'large'} fontWeight={700}>
                {name}
            </Text>
            <Divider />
            <CardBody align={'center'}>
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
            <CardFooter bg={'#f6019d'}>
                <Text>
                    {types}
                </Text>
            </CardFooter>
            <Divider />
            <Flex dir='row' justify={'space-between'} bg={'white'}>
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="sm" onClick={clickOnLink}>
                    Adicionar ao carrinho
                </Link>
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="sm">
                    Falar com a loja
                </Link>
            </Flex>
        </Card >
    )
}

export default ProductCard