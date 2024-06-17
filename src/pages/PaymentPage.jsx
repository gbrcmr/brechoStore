import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link, Text } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"

export const PaymentPage = () => {

    const [data, setData] = useState();

    const getStores = async () => {
        try {
            const response = await api.get("/store/search");

            setData(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar lojas", error);
            throw error;
        }

    }

    useEffect(() => {
        getStores();
    }, []);

    if (!data) {
        return null
    }
    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PIX PARA PAGAMENTO DO PEDIDO</Center>
                    <Flex justifyContent={'space-around'} wrap={'wrap'} gap={10}>
                        <Text>OIEEEEE</Text>

                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}