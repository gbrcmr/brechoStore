import {
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
    Divider,
    CardFooter,
    ButtonGroup,
    Button
} from '@chakra-ui/react'
import { Ratings } from './Ratings'


const StoreCard = ({ name, img, description, types }) => {

    return (
        <Card maxW='sm' bgGradient='linear(to-t, #91ffff, white)'>
            <Text bg={'#e8a2d3'} align={'center'} fontSize={'large'} fontWeight={700}>
                {name}
            </Text>
            <Divider />
            <CardBody>
                <Image
                    src={img}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'></Heading>
                    <Text>
                        {description}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter bg={'#91ffff'}>
                <Text>
                    {types}
                </Text>
            </CardFooter>
        </Card >
    )
}

export default StoreCard