import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  useDisclosure,
  InputGroup,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
//import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import api from '../services/api'
import useAuth from '../hooks/useAuth';

export const Cadaster = () => {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();


  const onClickReveal = () => {
    onToggle();
  };

  const isEmailValid = (email) => {
    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {

    // Reset errors
    setError('');
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');

    // Basic validation
    if (!name) {
      setNameError('Nome é obrigatório.');
      return;
    }

    if (!email) {
      setEmailError('Email é obrigatório.');
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError('Formato de email inválido.');
      return;
    }

    if (!phone) {
      setPhoneError('Telefone é obrigatório.');
      return;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória.');
      return;
    }

    console.log('passou aqui')
    // Call signUp function
    try {
      await signUp(name, email, password, phone);
      alert(`Conta criada!`)
      navigate('/login');
    } catch (error) {
      // Set error returned from signIn function
      console.log("deu ruim", error);

    }
  };

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
              Crie sua conta aqui!
            </Heading>
            <Text color="fg.muted">
              Já tem uma conta? <Link href="./Login">Clique aqui</Link>
            </Text>
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
              <FormControl isInvalid={nameError}>
                <FormLabel htmlFor="name">Nome completo</FormLabel>
                <Input
                  id="name"
                  type="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError('');
                  }}
                />
                <FormErrorMessage>{nameError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={emailError}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={phoneError}>
                <FormLabel htmlFor="phone">Telefone</FormLabel>
                <NumberInput>
                  <NumberInputField
                    id="phone"
                    type="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError('');
                    }}
                  />
                </NumberInput>
                <FormErrorMessage>{phoneError}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={passwordError}>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <IconButton
                      variant="text"
                      aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                      icon={isOpen ? <HiEyeOff /> : <HiEye />}
                      onClick={onClickReveal}
                    />
                  </InputRightElement>
                  <Input
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    type={isOpen ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                  />
                </InputGroup>
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack spacing="6">
              <Button backgroundColor={'#b28bc0'} color={'white'} onClick={handleSignUp}>
                Cadastrar
              </Button>
              {error && (
                <Text color="red.500" textAlign="center">
                  {error}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};