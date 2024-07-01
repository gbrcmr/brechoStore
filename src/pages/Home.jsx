import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, Center, Flex, Link } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    const { user } = useAuth();
    const [data, setData] = useState([]);

    const getStores = async () => {
        try {
            const response = await api.get("/store/search");
            if (user) {
                const filteredData = response.data.filter(store => store.userid !== user.id);
                setData(filteredData);
            }
        } catch (error) {
            console.error("Erro ao buscar lojas", error);
        }
    }

    useEffect(() => {
        setData([])
        if (user) {
            getStores();
        }
    }, [user]);

    if (!data.length) {
        return null;
    }

    return (
        <SidebarWithHeader>
            <Grid>
                <Center mb={5} fontWeight={700}>LOJAS RECOMENDADAS PARA VOCÊ</Center>
                <Flex justifyContent={'space-around'} wrap={'wrap'} gap={10}>
                    {data.map(store => (
                        <Link key={store.lojaid} href={`/store/${store.lojaid}`} _hover={{ textDecoration: "none" }}>
                            <StoreCard
                                name={store.nome_loja}
                                img={store.foto_loja || 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={store.instagram}
                                types={['Roupas, botas']}
                            />
                        </Link>
                    ))}
                </Flex>
            </Grid>
        </SidebarWithHeader>
    )
}