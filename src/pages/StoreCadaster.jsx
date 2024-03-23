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
   } from '@chakra-ui/react'


export const StoreCadaster = () => {
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
             base: '#b28bc0',
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
               <FormLabel color={'white'} htmlFor="name">Nome da loja</FormLabel>
                 <Input id="name" type="name" />
               </FormControl>
               <FormControl>
               <FormLabel  color={'white'} htmlFor="email">Email da loja</FormLabel>
                 <Input id="email" type="email" />
               </FormControl>
               <FormControl>
               <FormLabel  color={'white'} htmlFor="phone">Telefone</FormLabel>
                 <NumberInput>
                 <NumberInputField  color={'white'} id="phone" type="phone" />
                 </NumberInput>
               </FormControl>
               <FormControl>
               <FormLabel  color={'white'} htmlFor="email">Instagram</FormLabel>
                 <Input id="email" type="email" />
               </FormControl>
             </Stack>
             <Stack spacing="6">
               <Button backgroundColor={'#0266c8'} color={'white'}>Cadastrar</Button>
             </Stack>
           </Stack>
         </Box>
       </Stack>
     </Container>
    </SidebarWithHeader>
 )
}