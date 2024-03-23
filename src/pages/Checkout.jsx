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
    Flex,
} from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import { CartOrderSummary } from './Cart/CartOrderSummary'

export const Checkout = () => (
    <SidebarWithHeader>
        <Container
            dir='row'
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
            <Stack spacing="8">
                <Stack spacing="6">
                    <Stack
                        spacing={{
                            base: '2',
                            md: '3',
                        }}
                        textAlign="center"
                    >
                        <Heading
                            size={{
                                base: 'xs',
                                md: 'sm',
                            }}
                        >
                            Informações para entrega
                        </Heading>
                    </Stack>
                </Stack>
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
                                <FormLabel htmlFor="name">Nome completo</FormLabel>
                                <Input id="name" type="name"></Input>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="cpf">CPF</FormLabel>
                                <NumberInput>
                                    <NumberInputField id="cpf" type="cpf" placeholder={'xxx.xxx.xxx-xx'} />
                                </NumberInput>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="cpf">CEP</FormLabel>
                                <NumberInput>
                                    <NumberInputField id="cep" type="cep" placeholder={'xxxxx-xxx'} />
                                </NumberInput>
                            </FormControl>
                            <Flex dir='row' wrap={true}>
                                <FormControl mr={5}>
                                    <FormLabel htmlFor="street">Rua</FormLabel>
                                    <Input id="street" type="street" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="numberHouse">Número</FormLabel>
                                    <Input id="numberHouse" type="numberHouse" />
                                </FormControl>
                            </Flex>
                            <Flex dir='row' wrap={true}>
                                <FormControl mr={5}>
                                    <FormLabel htmlFor="city">Cidade</FormLabel>
                                    <Input id="city" type="city" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="state">Estado</FormLabel>
                                    <Input id="state" type="state" />
                                </FormControl>
                            </Flex>
                            <FormControl>
                                <FormLabel htmlFor="phone">Telefone</FormLabel>
                                <NumberInput>
                                    <NumberInputField id="phone" type="phone" placeholder={'(54) 99999-9999'} />
                                </NumberInput>
                            </FormControl>
                            <Link href='../Checkout' as={Button} bg="blue.500" size="lg" fontSize="md">
                                Ir para pagamento
                            </Link>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    </SidebarWithHeader>
)