import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';
import { CheckoutContext } from '../../contexts/CheckoutProvider';
import { useContext } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'


const handleCheckout = () => {
  window.location.href = "/checkout";
};

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
}

export const CartOrderSummary = () => {
  const { totalPrice, nameClient, productList, cpfClient, idUser } = useContext(CheckoutContext);

  const navigate = useNavigate();

  const productNamesArray = [];

  productList.forEach(product => {
    productNamesArray.push(product.nome_prod);
  });

  console.log('oiee', productNamesArray);

  const createOrder = async (pedidoid, data_ped, valor_ped, nome_prod, userid) => {
    try {

      const formattedValue = parseFloat(totalPrice).toFixed(2);

      const response = await api.post("/create/order", {
        pedidoid: pedidoid,
        data_ped: data_ped,
        valor_ped: valor_ped,
        nome_prod: nome_prod,
        userid: userid,
      });
      const data = await response.data;
      console.log('AYYYYYYYY', data);
    } catch (error) {
      console.error('Erro catch:', error);
    }

  }


  const createPix = async () => {
    try {
      const formattedValue = parseFloat(totalPrice).toFixed(2);

      const response = await api.post("/api/createCharge", {
        nomeDevedor: nameClient,
        cpfDevedor: cpfClient,
        valorPago: formattedValue
      });
      const data = await response.data;
      await createOrder(data.txid, data.loc.criacao, formattedValue, productNamesArray, idUser)
      navigate(`/checkout/payment/${data.txid}`);
    } catch (error) {
      console.error('Erro catch:', error);
    }

  }


  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Resumo de pedido</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      <Link as={Button} bg="blue.500" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={createPix}>
        Checkout
      </Link>
    </Stack>
  );
};