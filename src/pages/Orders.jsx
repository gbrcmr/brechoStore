import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import { Grid, GridItem, Center } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

export const Orders = () => {
    return(
        <SidebarWithHeader>
          <Center>
          <TableContainer>
  <Table variant='simple'>
    <TableCaption>Lista de pedidos feitos por você</TableCaption>
    <Thead>
      <Tr>
        <Th><Center>Número do pedido</Center></Th>
        <Th><Center>Data</Center></Th>
        <Th isNumeric><Center>Valor</Center></Th>
        <Th isNumeric><Center>Forma de pagamento</Center></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td><Center>123456</Center></Td>
        <Td><Center>02/01/2024</Center></Td>
        <Td isNumeric><Center>R$25,40</Center></Td>
        <Td isNumeric><Center>Cartão de crédito</Center></Td>
      </Tr>
      <Tr>
        <Td><Center>098765</Center></Td>
        <Td><Center>17/02/2024</Center></Td>
        <Td isNumeric><Center>R$32,00</Center></Td>
        <Td isNumeric><Center>Pix</Center></Td>
      </Tr>
      <Tr>
        <Td><Center>352180</Center></Td>
        <Td><Center>23/02/2024</Center></Td>
        <Td isNumeric><Center>R$78,50</Center></Td>
        <Td isNumeric><Center>Débito</Center></Td>
      </Tr>
    </Tbody>
    <Tfoot>
      <Tr>
        <Th><Center>Número do pedido</Center></Th>
        <Th><Center>Data</Center></Th>
        <Th isNumeric><Center>Valor</Center></Th>
        <Th isNumeric><Center>Forma de pagamento</Center></Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
</Center>
        </SidebarWithHeader>
    )
}