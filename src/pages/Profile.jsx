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
} from '@chakra-ui/react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import useAuth from '../hooks/useAuth'



export const Profile = () => {
    const { user } = useAuth()
    console.log('..............', user)
    return (
        < SidebarWithHeader >
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
                                Dados pessoais
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
                                    <Input id="name" type="name" disabled={true} placeholder={'Gabriel Camargo'}></Input>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="cpf">CPF</FormLabel>
                                    <NumberInput>
                                        <NumberInputField id="cpf" type="cpf" disabled={true} placeholder={'222.222.222-11'} />
                                    </NumberInput>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" disabled={true} placeholder={`${user.email}`} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="phone">Telefone</FormLabel>
                                    <NumberInput>
                                        <NumberInputField id="phone" type="phone" disabled={true} placeholder={'(54) 99999-9999'} />
                                    </NumberInput>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </SidebarWithHeader >
    )
}
