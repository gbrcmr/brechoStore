import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { formatPrice } from './PriceTag';
import { CheckoutContext } from '../../contexts/checkout';
import { useContext, useState, useEffect } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useCheckout from '../../hooks/useCheckout';

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
};

const Delivery = ({ onDeliveryCostChange, setDeliveryErrors }) => {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [cidade, setCidade] = useState('');
  const [cepError, setCepError] = useState('');
  const [enderecoError, setEnderecoError] = useState('');
  const [numeroError, setNumeroError] = useState('');
  const [estadoError, setEstadoError] = useState('');
  const [cidadeError, setCidadeError] = useState('');
  const [isAddressLocked, setIsAddressLocked] = useState(false);

  useEffect(() => {
    if (cep.length === 8) {
      // Fetch delivery cost
      fetchDeliveryCost(cidade)
        .then((cost) => {
          onDeliveryCostChange(cost);
          setCepError('');
        })
        .catch((error) => {
          console.error('Error fetching delivery cost:', error);
          setCepError(error.message); // Set the error message here
          onDeliveryCostChange(0);
        });

      // Complete address
      completeAddress(cep)
        .then((data) => {
          setEndereco(data.logradouro || '');
          setCidade(data.localidade || '');
          setEstado(data.uf || '');
          setIsAddressLocked(true);
          setEnderecoError(''); // Clear any previous enderecoError if address is fetched successfully
        })
        .catch((error) => {
          console.error('Error fetching address:', error);
          setEnderecoError('Erro ao buscar endereço');
          setIsAddressLocked(false);
        });
    } else {
      setIsAddressLocked(false);
    }
  }, [cep, cidade, onDeliveryCostChange]);

  const completeAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cep:', error);
      throw error;
    }
  };

  const fetchDeliveryCost = async (cidade) => {
    // Simulated API call to Correios
    // Replace this with the actual API call
    if (cidade === 'Caxias do Sul') {
      setCepError('')
      return 15.0; // Example delivery cost
    } else {
      setCepError('Tem Como n')
      throw new Error('Infelizmente a entrega só está disponível para Caxias do Sul');
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

  const validateEndereco = (endereco) => {
    if (!endereco || (endereco !== 'Caxias do Sul' && cidade === 'Caxias do Sul')) {
      setEnderecoError('Endereço inválido para Caxias do Sul');
      return false;
    }
    setEnderecoError('');
    return true;
  };

  const validateCidade = (cidade) => {
    if (!cidade) {
      setCidadeError('Cidade inválida');
      return false;
    }
    setCidadeError('');
    return true;
  };

  const validateNumero = (numero) => {
    if (!numero) {
      setNumeroError('Número inválido');
      return false;
    }
    setNumeroError('');
    return true;
  };

  const validateEstado = (estado) => {
    if (!estado) {
      setEstadoError('Estado inválido');
      return false;
    }
    setEstadoError('');
    return true;
  };

  // Function to set errors in parent component
  useEffect(() => {
    setDeliveryErrors({
      cepError,
      enderecoError,
      numeroError,
      estadoError,
      cidadeError,
    });
  }, [cepError, enderecoError, numeroError, estadoError, cidadeError, setDeliveryErrors]);

  return (
    <Stack spacing="4" fontSize="sm">
      <FormControl isInvalid={cepError}>
        <FormLabel htmlFor="cep">CEP</FormLabel>
        <Input
          id="cep"
          type="text"
          value={cep}
          onChange={handleCepChange}
          onBlur={() => validateCep(cep)}
        />
        <FormErrorMessage>{cepError}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={cidadeError}>
        <FormLabel htmlFor="cidade">Cidade</FormLabel>
        <Input
          id="cidade"
          type="text"
          value={cidade}
          isDisabled={isAddressLocked}
          onChange={(e) => {
            setCidade(e.target.value);
            if (cidadeError) validateCidade(e.target.value);
          }}
          onBlur={() => validateCidade(cidade)}
        />
        <FormErrorMessage>{cidadeError}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={enderecoError}>
        <FormLabel htmlFor="endereco">Endereço</FormLabel>
        <Input
          id="endereco"
          type="text"
          value={endereco}
          isDisabled={isAddressLocked}
          onChange={(e) => {
            setEndereco(e.target.value);
            if (enderecoError) validateEndereco(e.target.value);
          }}
          onBlur={() => validateEndereco(endereco)}
        />
        <FormErrorMessage>{enderecoError}</FormErrorMessage>
      </FormControl>

      <Flex align={'space-around'}>
        <FormControl mr={2} isInvalid={numeroError}>
          <FormLabel htmlFor="numero">Número</FormLabel>
          <Input
            id="numero"
            type="text"
            value={numero}
            onChange={(e) => {
              setNumero(e.target.value);
              if (numeroError) validateNumero(e.target.value);
            }}
            onBlur={() => validateNumero(numero)}
          />
          <FormErrorMessage>{numeroError}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={estadoError}>
          <FormLabel htmlFor="estado">Estado</FormLabel>
          <Input
            id="estado"
            type="text"
            value={estado}
            isDisabled={isAddressLocked}
            onChange={(e) => {
              setEstado(e.target.value);
              if (estadoError) validateEstado(e.target.value);
            }}
            onBlur={() => validateEstado(estado)}
          />
          <FormErrorMessage>{estadoError}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Stack>
  );
};

export const CartOrderSummary = () => {
  const { totalPrice, nameClient, productList, cpfClient, idUser } = useCheckout();
  const navigate = useNavigate();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [deliveryErrors, setDeliveryErrors] = useState({});
  const { cart, user } = useAuth();

  console.log('CARRINHOO', cart)

  const productNamesArray = productList.map(product => product.nome_prod);
  const productidsArray = productList.map(product => product.prodid);


  const cleanCart = async (userid) => {
    try {
      await api.put(`/cart/remove/${userid}`);


    } catch (error) {
      console.error("Erro ao remover produtos do carrinho", error);
      throw error;
    }
  }

  const redirectAndSendEmail = async (pedidoid) => {
    try {
      const response = await api.post('/send', {
        toEmail: user[0].email,
        emailBody: '<h1>Atualização do seu pedido! Aguardando pagamento</h1>' // Corpo HTML do email
      });

      console.log(response.data);

      navigate(`/checkout/payment/${pedidoid}`);
      return response.data;

    } catch (error) {
      console.error('Erro ao enviar email:', error);

    }
  };


  const hideProduct = async (prodid, desativado) => {

    try {
      console.log('MAMAMAMA', prodid)
      await api.put(`/product/hide/${prodid}/${desativado}`);

    } catch (error) {
      console.error('Erro em esconder produto:', error);
    }
  };

  const clearStoreId = async (id) => {

    try {
      console.log('PAULADA', id)
      await api.delete(`/cart/register/remove/${id}`);

    } catch (error) {
      console.error('Erro em apagar id loja:', error);
    }
  };

  useEffect(() => {
    console.log('BATEBATEBATE', cart)
    if (cart === 0) {
      clearStoreId(idUser)
    }
  }, [cart]);


  console.log('JUVENTUDE', productList)

  const createOrder = async (pedidoid, data_ped, valor_ped, nome_prod, userid, prodids, lojaid) => {
    try {

      cleanCart(userid)
      await productList.map(product => hideProduct(product.prodid, true));
      const response = await api.post("/create/order", {
        pedidoid,
        data_ped,
        valor_ped,
        nome_prod,
        userid,
        prodids,
        lojaid
      });
      const data = await response.data;
      console.log('oiee', data.pedidoid)
      await redirectAndSendEmail(data.pedidoid)
      console.log('Order created:', data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };


  const createPix = async () => {
    // Check for any delivery errors before proceeding
    if (Object.values(deliveryErrors).some(error => error)) {
      alert('Por favor, corrija os erros de validação no endereço de entrega.');
      return;
    }

    try {
      const formattedValue = parseFloat(totalPrice).toFixed(2);

      const response = await api.post("/api/createCharge", {
        nomeDevedor: nameClient,
        cpfDevedor: cpfClient,
        valorPago: (parseFloat(totalPrice) + deliveryCost).toFixed(2)
      });
      const data = await response.data;
      await createOrder(data.txid, data.loc.criacao, formattedValue, productNamesArray, idUser, productidsArray, user[0].lojaid_carrinho);
      productNamesArray.map(product => product);
      //navigate(`/checkout/payment/${data.txid}`);
    } catch (error) {
      console.error('Error creating Pix charge:', error);
    }
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Resumo de pedido</Heading>

      <Stack spacing="6">
        <Delivery onDeliveryCostChange={setDeliveryCost} setDeliveryErrors={setDeliveryErrors} />
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
        <OrderSummaryItem label="Entrega" value={formatPrice(deliveryCost)} />
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">Total</Text>
          <Text fontSize="xl" fontWeight="extrabold">{formatPrice(parseFloat(totalPrice) + deliveryCost)}</Text>
        </Flex>
      </Stack>
      <Link as={Button} bg="blue.500" size="lg" fontSize="md" rightIcon={<FaArrowRight />} onClick={createPix}>
        Checkout
      </Link>
    </Stack>
  );
};