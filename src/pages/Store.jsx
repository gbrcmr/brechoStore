import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import AddCard from "../components/AddCard"
import { Grid, GridItem, Center, Flex, Spacer } from '@chakra-ui/react'
import { Products } from './Products'
import ProductCardEditable from "../components/ProductCardEditable"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import api from "../services/api"

export const Store = () => {
    const [isRegistred, setIsRegistred] = useState()

    const [dataProd, setDataProd] = useState();

    const user_token = JSON.parse(localStorage.getItem('user_token'))
    const user_token_json = user_token.userid
    console.log(user_token_json)

    const store_token = JSON.parse(localStorage.getItem('store_token'))
    const store_token_json = store_token.userid
    console.log(store_token_json)



    const navigate = useNavigate();


    const getProducts = async () => {
        try {
            const response = await api.get("/store/products");

            setDataProd(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }

    }

    useEffect(() => {
        if (user_token_json === store_token_json) {
            setIsRegistred(true)
        } else {
            setIsRegistred(false)
        }
        getProducts();
    }, [isRegistred]);

    if (!isRegistred) {
        return navigate('/store/cadaster');
    }



    if (!dataProd) {
        return null
    }
    return (
        <SidebarWithHeader>
            <Grid>
                <Center mb={5} fontWeight={700}>SEUS PRODUTOS</Center>
                <Flex justifyContent={'space-around'} gap={10} wrap={'wrap'}>
                    {dataProd.map(product => (
                        <ProductCardEditable key={product.prodid}
                            name={product.nome_prod}
                            img={product.foto_prod || 'https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={product.descricao_prod || 'Short rosa de academia, leve e confortável.'}
                            types={[`${product.tipo_prod}, ${product.tamanho_prod}`]}
                        />
                    ))}
                    <AddCard />
                </Flex>
            </Grid>
        </SidebarWithHeader>
    );
}