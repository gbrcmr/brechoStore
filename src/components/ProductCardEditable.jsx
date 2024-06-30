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
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    Badge
} from '@chakra-ui/react'
import { Ratings } from './Ratings'

const handleCart = () => {
    window.location.href = "./cart";
}


const ProductCardEditable = ({ name, img, description, types, price }) => {

    return (
        <Card maxW={340} bgGradient='linear(to-t, #91ffff, white)' >
            <Text bg={'#ff91d7'} align={'center'} fontSize={'large'} fontWeight={700}>
                {name}
            </Text>
            <Divider />
            <CardBody align={'center'}>
                <Image
                    resize={'cover'}
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
                <Link m={5} as={Button} bg="blue.500" size="lg" fontSize="md" onClick={handleCart}>
                    Editar
                </Link>
                <Link m={5} as={Button} bg="red.500" size="lg" fontSize="md">
                    Apagar
                </Link>
            </Flex>
        </Card >
    )
}

export default ProductCardEditable