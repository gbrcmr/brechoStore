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

  // Função para buscar o status do pedido
  const getStatusOrder = async (txid) => {
    try {
      const response = await api.get(`/api/details/${txid}`);
      const status = response.data.status;
      // Ajustar status "ATIVO" para "AGUARDANDO PAGAMENTO"
      if (status === 'ATIVA') {
        return 'AGUARDANDO PAGAMENTO';
      }
      return status;
    } catch (error) {
      console.error("Erro ao buscar status do pedido", error);
      return 'Erro';
    }
  };


  // Função para buscar os pedidos do usuário
  const getOrders = async () => {
    try {
      if (user) {
        const response = await api.get(`/order/${user.id}`);
        const orders = response.data;


        // Buscar status para cada pedido
        const statuses = await Promise.all(
          orders.map(async (order) => {
            const status = await getStatusOrder(order.pedidoid);
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



  const redirectAndSendEmail = async (pedidoid) => {
    const response = await api.get(`/send`);

    navigate(`/checkout/payment/${pedidoid}`);
    return response.data
  }

  useEffect(() => {
    if (user !== null) {
      getOrders();
    }
  }, [user]);

  if (user == null) {
    return null;
  }

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
                  <Td bg={orderStatuses[order.pedidoid] === 'CONCLUIDA' ? 'green.100' : 'yellow.100'}><Center><Link onClick={() => redirectAndSendEmail(order.pedidoid)}>{orderStatuses[order.pedidoid] || 'Carregando...'}</Link></Center></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </SidebarWithHeader>
  );
};