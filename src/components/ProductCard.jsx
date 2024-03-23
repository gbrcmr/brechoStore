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

const handleCart = () => {
    window.location.href = "./cart";
}


const ProductCard = ({ name, img, description, types }) => {

    return (
        <Card maxW='sm' bg={'#00a8ff'} >
            <Text bg={'#b28bc0'} align={'center'} fontSize={'large'} fontWeight={700}>
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
            <CardFooter bg={'white'}>
                <Text>
                    {types}
                </Text>
            </CardFooter>
            <Divider />
            <Flex dir='row' justify={'space-between'} bg={'white'}>
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="sm" onClick={handleCart}>
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