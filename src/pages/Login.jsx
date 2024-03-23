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
   } from '@chakra-ui/react'
   import { PasswordField } from '../components/PasswordField'
   
   export const Login = () => (
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
               <FormControl>
                 <FormLabel htmlFor="email">Email</FormLabel>
                 <Input id="email" type="email" />
               </FormControl>
               <PasswordField />
             </Stack>
             <HStack justify="space-between">
               <Checkbox defaultChecked>Lembre-me</Checkbox>
               <Button variant="text" size="sm">
                 Forgot password?
               </Button>
             </HStack>
             <Stack spacing="6">
               <Button backgroundColor={'#b28bc0'} color={'white'}>Entrar</Button>
             </Stack>
           </Stack>
         </Box>
       </Stack>
     </Container>
   )