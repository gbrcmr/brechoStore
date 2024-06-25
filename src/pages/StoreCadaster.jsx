import React, { useState } from 'react';
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
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
  FormErrorMessage
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


export const StoreCadaster = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user_token'));

  const [nameStore, setNameStore] = useState('');
  const [emailStore, setEmailStore] = useState('');
  const [instagram, setInstagram] = useState('');
  const [phoneStore, setPhoneStore] = useState('');
  const [photoStore, setPhotoStore] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [instagramError, setInstagramError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [error, setError] = useState('');
  const { createStore } = useAuth();

  const isEmailValid = (emailStore) => {
    // Regex for emailStore validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStore);
  };

  const handleStoreCadaster = async () => {

    // Reset errors
    setError('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setInstagramError('');

    // Basic validation
    if (!nameStore) {
      setNameError('Nome é obrigatório.');
      return;
    }

    if (!emailStore) {
      setEmailError('emailStore é obrigatório.');
      return;
    }

    if (!isEmailValid(emailStore)) {
      setEmailError('Formato de emailStore inválido.');
      return;
    }

    if (!phoneStore) {
      setPhoneError('Telefone é obrigatório.');
      return;
    }

    if (!photoStore) {
      setPhoneError('Foto é obrigatória.');
      return;
    }


    try {
      await createStore(nameStore, emailStore, phoneStore, instagram, photoStore);
      alert(`bem-vindo!`)
      navigate('/');
    } catch (error) {

      console.log("deu ruim", error);

    }
  };

  return (
    <SidebarWithHeader>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '6',
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
                Crie a conta da sua loja
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
              base: '#f6019d',
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
                <FormControl isInvalid={nameError}>
                  <FormLabel color={'white'} htmlFor="nameStore">Nome da loja</FormLabel>
                  <Input
                    id="nameStore"
                    type="nameStore"
                    value={nameStore}
                    onChange={(e) => {
                      setNameStore(e.target.value);
                      setNameError('');
                    }}
                  />
                  <FormErrorMessage>{nameError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={emailError}>
                  <FormLabel color={'white'} htmlFor="emailStore">email da loja</FormLabel>
                  <Input
                    id="emailStore"
                    type="emailStore"
                    value={emailStore}
                    onChange={(e) => {
                      setEmailStore(e.target.value);
                      setEmailError('');
                    }}
                  />
                  <FormErrorMessage>{emailError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={phoneError}>
                  <FormLabel color={'white'} htmlFor="phoneStore">Telefone</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      id="phoneStore"
                      type="phoneStore"
                      value={phoneStore}
                      onChange={(e) => {
                        setPhoneStore(e.target.value);
                        setPhoneError('');
                      }}
                    />
                  </NumberInput>
                  <FormErrorMessage>{phoneError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={instagramError}>
                  <FormLabel color={'white'} htmlFor="instagram">Instagram</FormLabel>
                  <Input
                    id="instagram"
                    type="instagram"
                    value={instagram}
                    onChange={(e) => {
                      setInstagram(e.target.value);
                      setInstagramError('');
                    }}
                  />
                  <FormErrorMessage>{instagramError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={photoError}>
                  <FormLabel color={'white'} htmlFor="photoStore">Foto da loja</FormLabel>
                  <Input
                    id="photoStore"
                    type="photoStore"
                    value={photoStore}
                    onChange={(e) => {
                      setPhotoStore(e.target.value);
                      setPhotoError('');
                    }}
                  />
                  <FormErrorMessage>{photoError}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Button backgroundColor={'#b28bc0'} color={'white'} onClick={handleStoreCadaster}>
                Cadastrar
              </Button>
              {error && (
                <Text color="red.500" textAlign="center">
                  {error}
                </Text>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </SidebarWithHeader>
  )
}