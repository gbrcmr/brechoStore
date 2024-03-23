import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    NumberInput,
    NumberInputField,
    Stack,
    Text,
    Select,
    useDisclosure,
    Flex,
} from '@chakra-ui/react'
import { PasswordField } from '../components/PasswordField'


const AddForm = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (

        <Container
            maxW="lg"
            py={{
                base: '12',
                md: '24',
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
                        <FormControl>
                            <FormLabel htmlFor="productName">Nome do produto</FormLabel>
                            <Input id="productName" type="productName" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Descrição</FormLabel>
                            <Input id="description" type="description" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="value">Valor</FormLabel>
                            <NumberInput>
                                <NumberInputField id="value" type="value" />
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <Select placeholder='Tipo do produto'>
                                <option value='option1'>Roupa</option>
                                <option value='option2'>Calçado</option>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default AddForm;