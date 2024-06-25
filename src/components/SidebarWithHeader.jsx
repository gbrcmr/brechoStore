'use client'

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link,
  Select,
  Image,
  background,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiHeart,
  FiShoppingCart,
  FiLogOut
} from 'react-icons/fi'
import { Search } from './Search'
import { FcFullBattery } from 'react-icons/fc'
import useAuth from '../hooks/useAuth'
import { useState, useEffect } from 'react'
import api from '../services/api'
const LinkItems = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Perfil', icon: FiSettings, route: '/Profile' },
  { name: 'Minha loja', icon: FiCompass, route: '/store' },
  { name: 'Meus pedidos', icon: FiTrendingUp, route: '/orders' },
  { name: 'Favoritos', icon: FiHeart, route: '/favorites' },
  { name: 'Sair', icon: FiLogOut, route: '/login' },
]

const SidebarContent = ({ onClose, ...rest }) => {

  const userToken = localStorage.getItem("user_token");
  const parsedToken = JSON.parse(userToken);
  const idUser = parsedToken.userid;
  const [dataCart, setDataCart] = useState('')

  const cartById = async (userId) => {
    try {
      console.log(userId)
      const response = await api.get(`/cart/${userId}`);
      setDataCart(response.data[0].carrinho.length || []);

    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      throw error;
    }
  }


  return (
    <Box
      transition="3s ease"
      bgGradient='linear(to-b, #ff91d7 , #82EEFD)'
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image
          boxSize='130px'
          src='https://raw.githubusercontent.com/Gu1mot4/brechoStore/main/Logo%20Brecho%20V2.png'
          alt='Logo Brecho.png'
        />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} routes={link.route}>
          {link.name}
        </NavItem>
      ))}
      <Select w={210} ml={4} mt={5} placeholder='Qual a sua cidade?'>
        <option value='option1'>Caxias do Sul</option>
        <option value='option2'>Farroupilha</option>
      </Select>

      <Flex align="center" justify="center" p={4}>
        <Link>
          <Text fontSize={12} ml={4}>Tem roupas que gostaria de doar? Clique aqui!</Text>
        </Link>
      </Flex>
    </Box>
  )
}

const NavItem = ({ icon, routes, children, ...rest }) => {
  return (
    <Box
      as="a"
      href={routes}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#00a8ff',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  const userToken = localStorage.getItem("user_token");
  const parsedToken = JSON.parse(userToken);
  const idUser = parsedToken.userid;
  const [dataCart, setDataCart] = useState('')

  const cartById = async (userId) => {
    try {
      console.log(userId)
      const response = await api.get(`/cart/${userId}`);
      setDataCart(response.data[0].carrinho.length || []);

    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      throw error;
    }
  }

  useEffect(() => {
    cartById(idUser)
  }, [idUser]);



  console.log(dataCart)
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bgGradient='linear(to-r, #ff91d7 , #82EEFD)'
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        bgGradient='linear(to-r, #ff91d7 , #82EEFD)'
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '80' }}>
        <Search />
        <Link href='/cart' display="flex" alignItems="center" _hover={{ textDecoration: 'none' }}>
          <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiShoppingCart />} />
          <span style={{ marginLeft: '8px', color: 'currentColor', display: 'inline-block' }}>
            {dataCart || ''}
          </span>
        </Link>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader