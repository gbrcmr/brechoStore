import ProductCard from "../components/ProductCard";
import { Search } from "../components/Search";
import SidebarWithHeader from "../components/SidebarWithHeader";
import StoreCard from "../components/StoreCard";
import AddCard from "../components/AddCard";
import { Grid, Center, Flex } from '@chakra-ui/react';
import { Products } from './Products';
import ProductCardEditable from "../components/ProductCardEditable";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api from "../services/api";

export const Store = () => {
    const [isRegistered, setIsRegistered] = useState(null);
    const [dataUser, setDataUser] = useState(undefined);
    const [dataProd, setDataProd] = useState(undefined);

    const userToken = JSON.parse(localStorage.getItem('user_token'));
    const userTokenJson = userToken?.userid;
    console.log('eiei', userTokenJson)

    const storeToken = JSON.parse(localStorage.getItem('store_token'));
    const storeId = storeToken?.lojaid;

    const navigate = useNavigate();

    const getMyStore = async () => {
        try {
            const response = await api.get(`/store/mystore/${userTokenJson}`);
            console.log(response.data[0].lojaid)
            setDataUser(response.data[0].lojaid);
            return response.data;
        } catch (error) {
            setIsRegistered(false);

        }
    };

    const getProducts = async () => {
        try {
            const response = await api.get(`/store/${dataUser}`);
            setDataProd(response.data);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };


    useEffect(() => {
        getMyStore();
    }, []);

    useEffect(() => {
        console.log('.........', dataUser)
        if (dataUser !== undefined) {
            console.log('passou')
            setIsRegistered(true);
            getProducts();
        }
    }, [dataUser]);

    useEffect(() => {
        if (isRegistered === false) {
            navigate('/store/cadaster');
        }
    }, [isRegistered, navigate]);

    if (dataProd === undefined) {
        return null;
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