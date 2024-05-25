import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import api from "../services/api"

export const Products = () => {


    const [dataProd, setDataProd] = useState();
    const [dataStore, setDataStore] = useState();
    var url = window.location.href;
    var urlParts = url.split('/');
    var storeId = urlParts[urlParts.length - 1]
    let productArray = []



    console.log(storeId)

    const getStores = async () => {
        try {
            const response = await api.get("/store/search");

            setDataStore(response.data)

            return response.data;
        } catch (error) {
            console.error("Erro ao buscar lojas", error);
            throw error;
        }

    }

    const getProducts = async () => {
        try {
            const response = await api.get(`/store/${storeId}`);

            setDataProd(response.data)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }

    }

    useEffect(() => {
        getStores();
        getProducts();
    }, []);

    productArray.push(dataProd)
    console.log(productArray)





    if (!dataProd || !dataStore) {
        return null
    }
    return (
        <>

            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PRODUTOS DESSA LOJA</Center>
                    <Flex justifyContent={'space-around'} gap={10}>
                        {productArray.map(product => (

                            <ProductCard key={product.prodid}
                                name={product.nome_prod}
                                img={product.foto_prod || 'https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={product.descricao_prod || 'Short rosa de academia, leve e confortável.'}
                                types={[`${product.tipo_prod}, ${product.tamanho_prod}`]}
                            />
                        ))}
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}