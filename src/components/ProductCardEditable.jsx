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
} from '@chakra-ui/react'
import { Ratings } from './Ratings'

const handleCart = () => {
    window.location.href = "./cart";
}


const ProductCardEditable = ({ name, img, description, types }) => {

    return (
        <Card maxW={340} bg={'#2de2e6'} >
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