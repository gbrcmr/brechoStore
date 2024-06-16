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
  const { totalPrice } = useContext(CheckoutContext);

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
      <Link as={Button} bg="blue.500" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={handleCheckout}>
        Checkout
      </Link>
    </Stack>
  );
};