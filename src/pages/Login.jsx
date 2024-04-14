import React, { useState } from 'react';
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
  Stack,
  Text,
  FormErrorMessage,
  InputRightElement,
  IconButton,
  useDisclosure,
  InputGroup,
} from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const Login = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onClickReveal = () => {
    onToggle();
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Por favor, preencha seu email.');
      return;
    }

    if (!password) {
      setPasswordError('Por favor, preencha sua senha.');
      return;
    }

    try {
      await signIn(email, password);
      alert(`bem-vindo!`)
      navigate('/');
    } catch (error) {
      // Set error returned from signIn function
      console.log(email);
      console.log(password);
      setEmailError('email ou senha incorretos');
      setPasswordError('email ou senha incorretos');
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
              Entre na sua conta
            </Heading>
            <Text color="fg.muted">
              Não tem uma conta? <Link href="./Cadaster">Clique aqui</Link>
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
            <HStack justify="space-between">
              <Checkbox defaultChecked>Lembre-me</Checkbox>
              <Button variant="text" size="sm">
                Esqueceu sua senha?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button backgroundColor={'#b28bc0'} type="submit" color={'white'} onClick={handleLogin}>
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};