import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  CloseButton,
  Image,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { CartOrderSummary } from './CartOrderSummary'
import SidebarWithHeader from '../../components/SidebarWithHeader'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import { PriceTag } from './PriceTag'
import { CheckoutProvider } from '../../contexts/checkout'
import useAuth from '../../hooks/useAuth'
import Lottie from 'react-lottie'
import animationData from '../../assets/shopping.json'


export const Cart = () => {
  const [dataCart, setDataCart] = useState([]);
  const [productList, setProductList] = useState([]);
  const userToken = localStorage.getItem("user_token");
  const parsedToken = JSON.parse(userToken);
  const idUser = parsedToken.userid;
  const { cart, setCart } = useAuth();

  const cartById = async (userId) => {
    try {
      const response = await api.get(`/cart/${userId}`);
      console.log("Cart data:", response.data[0].carrinho);
      setDataCart(response.data[0].carrinho || []);
      setCart(response.data[0].carrinho.length)
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      throw error;
    }
  }

  const getProductsByProductId = async (prodId) => {
    try {
      const response = await api.get(`/cart/product/${prodId}`);
      return response.data[0];
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
      throw error;
    }
  }

  useEffect(() => {
    cartById(idUser);
  }, [idUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (Array.isArray(dataCart)) {
        const products = await Promise.all(dataCart.map(item => getProductsByProductId(item)));
        setCart(dataCart.length)
        setProductList(products);
        console.log('AQUIII', dataCart)
      } else {
        console.error("dataCart is not an array", dataCart);
      }
    };

    fetchProducts();
  }, [dataCart]);

  const deleteCart = async (prodid, userid) => {
    try {

      const response = await api.delete(`/cart/delete/${userid}/${prodid}`);
      setDataCart(prevDataCart => prevDataCart.filter(item => item !== prodid));
    } catch (error) {
      console.error("Erro ao deletar produto", error);
      throw error;
    }
  }

  const CartProductMeta = (props) => {
    const { image, name, description } = props;
    return (
      <Stack direction="row" spacing="5" width="full">
        <Image
          rounded="lg"
          width="120px"
          height="120px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
        <Box pt="4">
          <Stack spacing="0.5">
            <Text fontWeight="medium">{name}</Text>
            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
              {description}
            </Text>
          </Stack>
        </Box>
      </Stack>
    )
  }

  const CartItem = (props) => {
    const {
      name,
      description,
      imageUrl,
      currency,
      price,
      onClickDelete,
    } = props;

    return (
      <Flex
        direction={{
          base: 'column',
          md: 'row',
        }}
        justify="space-between"
        align="center"
      >
        <CartProductMeta
          name={name}
          description={description}
          image={imageUrl}
        />

        <Flex
          width="full"
          justify="space-between"
          display={{
            base: 'none',
            md: 'flex',
          }}
        >
          <PriceTag price={price} currency={currency} />
          <CloseButton aria-label={`Delete ${name} from cart`} onClick={onClickDelete} />
        </Flex>

        <Flex
          mt="4"
          align="center"
          width="full"
          justify="space-between"
          display={{
            base: 'flex',
            md: 'none',
          }}
        >
          <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
            Delete
          </Link>
          <PriceTag price={price} currency={currency} />
        </Flex>
      </Flex>
    )
  }



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };





  return (
    <SidebarWithHeader>
      <Box
        maxW={{
          base: '3xl',
          lg: '7xl',
        }}
        mx="auto"
        px={{
          base: '4',
          md: '8',
          lg: '12',
        }}
        py={{
          base: '6',
          md: '8',
          lg: '12',
        }}
      >
        <Stack
          direction={{
            base: 'column',
            lg: 'row',
          }}
          align={{
            lg: 'flex-start',
          }}
          spacing={{
            base: '8',
            md: '16',
          }}
        >
          <Stack
            spacing={{
              base: '8',
              md: '10',
            }}
            flex="2"
          >
            <Heading fontSize="2xl" alignSelf={'center'} fontWeight="extrabold">
              Carrinho de compras
            </Heading>

            <Stack spacing="6">
              {productList.length === 0 &&
                <Flex justifyContent={'center'} alignItems={'center'} mt={10} flexDirection={'column'}>
                  <Text mb={10} fontSize='2xl'>OPS! Parece que não há nada no seu carrinho!</Text>
                  <Lottie
                    options={defaultOptions}
                    height={200}
                    width={300}
                  />
                  <Text mt={10} fontSize='1xl'>Continue comprando para que seus produtos apareçam aqui...</Text>
                </Flex>
              }
              {productList.map((item) => (
                <CartItem
                  key={item.prodid}
                  name={item.nome_prod}
                  description={item.descricao_prod}
                  imageUrl={item.foto_prod}
                  currency={'BRL'}
                  price={item.preco_prod}
                  onClickDelete={() => deleteCart(item.prodid, idUser)}
                />
              ))}
            </Stack>
          </Stack>

          <Flex direction="column" align="center" flex="1">
            <CheckoutProvider>
              <CartOrderSummary />
            </CheckoutProvider>
            <HStack mt="6" fontWeight="semibold">
              <p>ou</p>
              <Link href='/' color={mode('blue.500', 'blue.200')}>Continuar comprando</Link>
            </HStack>
          </Flex>
        </Stack>
      </Box>
    </SidebarWithHeader>
  )
}