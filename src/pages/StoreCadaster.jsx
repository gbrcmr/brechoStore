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
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [instagramError, setInstagramError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [cepError, setCepError] = useState('');
  const [enderecoError, setEnderecoError] = useState('');
  const [numeroError, setNumeroError] = useState('');
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
    setCepError('')
    setEnderecoError('')
    setNumeroError('')

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

    if (!cep) {
      setCepError('CEP é obrigatório.');
      return;
    }

    if (!endereco) {
      setEnderecoError('endereço é obrigatório.');
      return;
    }

    if (!numero) {
      setNumeroError('Número é obrigatório.');
      return;
    }

    try {
      await createStore(nameStore, emailStore, phoneStore, instagram, photoStore, cep, endereco, numero);
      alert(`bem-vindo!`)
      navigate('/');
    } catch (error) {

      console.log("deu ruim", error);

    }
  };


  const validateCep = (cep) => {
    if (!cep || cep.length !== 8) {
      setCepError('CEP inválido');
      return false;
    }
    setCepError('');
    return true;
  };

  const handleCepChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (inputValue.length <= 8) {
      setCep(inputValue);
      if (cepError) validateCep(inputValue);
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
              base: 'purple',
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
                <FormControl isInvalid={cepError}>
                  <FormLabel color={'white'} htmlFor="cep">Cep da loja</FormLabel>
                  <Input
                    id="cep"
                    type="cep"
                    value={cep}
                    onChange={handleCepChange}
                    onBlur={() => validateCep(cep)}
                  />
                  <FormErrorMessage>{cepError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={enderecoError}>
                  <FormLabel color={'white'} htmlFor="endereco">Endereço da loja</FormLabel>
                  <Input
                    id="endereco"
                    type="endereco"
                    value={endereco}
                    onChange={(e) => {
                      setEndereco(e.target.value);
                      setEnderecoError('');
                    }}
                  />
                  <FormErrorMessage>{enderecoError}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={numeroError}>
                  <FormLabel color={'white'} htmlFor="photoStore">Número</FormLabel>
                  <Input
                    id="numero"
                    type="numero"
                    value={numero}
                    onChange={(e) => {
                      setNumero(e.target.value);
                      setNumeroError('');
                    }}
                  />
                  <FormErrorMessage>{numeroError}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Button backgroundColor={'blue.500'} color={'white'} onClick={handleStoreCadaster}>
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