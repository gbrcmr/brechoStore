import { Search } from "../components/Search";
import SidebarWithHeader from "../components/SidebarWithHeader";
import { Grid, GridItem, Center, Link, Box } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import sgMail from '@sendgrid/mail';



export const Orders = () => {
  const { user } = useAuth();
  const [orderList, setOrderData] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate();

  console.log(`GOLOOOOOOOOOOOO`, user)


  const formatValue = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatDate = (data) => {
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat('pt-BR').format(dataObj);
  };





  const checkIfDatePassed = async (providedDateString) => {

    const currentDate = new Date();


    const providedDate = new Date(providedDateString);

    providedDate.setHours(providedDate.getHours() + 1);
    providedDate.setSeconds(providedDate.getSeconds() + 1);



    if (providedDate > currentDate) {

      return true;
    } else {
      return false;
    }
  };


  //CONTINUAR AQUI
  const hideProduct = async (prodid, desativado) => {

    try {
      console.log('MAMAMAMA', prodid)
      const response = await api.put(`/product/hide/${prodid}/${desativado}`);

    } catch (error) {
      console.error('Erro em esconder produto:', error);
    }
  };





  // Função para buscar o status do pedido
  const getStatusOrder = async (txid, prodids) => {
    try {
      const response = await api.get(`/api/details/${txid}`);
      const createdDate = await checkIfDatePassed(response.data.calendario.criacao)

      if (!createdDate) {

        prodids?.map(product => hideProduct(product, false));

        return 'CANCELADO'
      }
      const status = response.data.status;
      // Ajustar status "ATIVO" para "AGUARDANDO PAGAMENTO"
      if (status === 'ATIVA') {
        console.log('tamanhooooo', prodids)
        return 'AGUARDANDO PAGAMENTO';
      }
      return status;
    } catch (error) {
      console.error("Erro ao buscar status do pedido", error);
      return 'Erro';
    }
  };




  const getOrders = async () => {
    try {
      if (user) {
        console.log('SSSSSSSSSSS', user)
        const response = await api.get(`/order/${user[0].userid}`);
        const orders = response.data;



        const statuses = await Promise.all(
          orders.map(async (order) => {
            console.log('Eaiiiiiiiii', order)
            const status = await getStatusOrder(order.pedidoid, order.prodids);
            return { pedidoid: order.pedidoid, status };
          })
        );

        const statusMap = {};
        statuses.forEach(({ pedidoid, status }) => {
          statusMap[pedidoid] = status;
        });

        setOrderData(orders);
        setOrderStatuses(statusMap);
        setHasData(true);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos", error);
    }
  };




  const redirectOrder = async (pedidoid) => {
    try {
      navigate(`/checkout/payment/${pedidoid}`);

    } catch (error) {
      console.error('Erro ao redirecionar:', error);

    }
  };

  useEffect(() => {
    if (user) {
      getOrders();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  console.log('AUAUAUAU', orderList)

  return (
    <SidebarWithHeader>
      <Center>
        <TableContainer>
          <Table size={'md'} variant='simple' colorScheme='black'>
            <TableCaption>Lista de pedidos feitos por você</TableCaption>
            <Thead>
              <Tr>
                <Th><Center>Número do pedido</Center></Th>
                <Th><Center>Produtos</Center></Th>
                <Th isNumeric><Center>Data</Center></Th>
                <Th><Center>Valor</Center></Th>
                <Th><Center>Status do pagamento</Center></Th>
              </Tr>
            </Thead>
            <Tbody>
              {hasData && orderList.map(order => (
                <Tr key={order.pedidoid}>
                  <Td><Center>{order.pedidoid}</Center></Td>
                  <Td>
                    <Box textAlign="center" whiteSpace="pre-wrap">
                      {order.nome_prod.join('\n')}
                    </Box>

                  </Td>
                  <Td><Center>{formatDate(order.data_ped)}</Center></Td>
                  <Td isNumeric><Center>{formatValue(parseFloat(order.valor_ped) + 15.00)}</Center></Td>
                  <Td bg={orderStatuses[order.pedidoid] === 'CONCLUIDA' ? 'green.100' : orderStatuses[order.pedidoid] === 'CANCELADO' ? 'red.500' : 'yellow.100'}><Center><Link onClick={() => redirectOrder(order.pedidoid)}>{orderStatuses[order.pedidoid] || 'Carregando...'}</Link></Center></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </SidebarWithHeader>
  );
};