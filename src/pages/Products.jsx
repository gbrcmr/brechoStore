import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Alert, AlertIcon, ScaleFade } from '@chakra-ui/react'
import { useState, useEffect, useToggle } from "react"
import api from "../services/api"

export const Products = () => {


    const [dataProd, setDataProd] = useState();
    const [dataCart, setDataCart] = useState();

    const [isVisible, setIsVisible] = useState(false)
    var url = window.location.href;
    var urlParts = url.split('/');
    var storeId = urlParts[urlParts.length - 1]
    let productArray = []
    let arrayProd = []

    const userToken = localStorage.getItem("user_token");
    const parsedToken = JSON.parse(userToken);
    const idUser = parsedToken.userid;

    //console.log(arrayProd)

    //console.log(storeId)



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

        getProducts();
    }, []);

    productArray.push(dataProd)

    const showAlert = () => {
        setTimeout(() => {
            setIsVisible(false)
        }, "2000");
    }

    const addToCart = async (prodid, userid) => {
        try {
            console.log(userid)
            console.log(prodid)
            const response = await api.put(`/cart/add/${userid}/${prodid}`);

            setIsVisible(true)
            setDataCart(response.data)
            showAlert();

            return response.data;
        } catch (error) {
            console.error("Erro ao adicionar produtos", error);
            throw error;
        }
    }


    const handleCart = (id) => {
        let found = arrayProd.find((element) => element === id);
        if (found === undefined) {
            console.log('deu boa')
            addToCart(id, idUser)
            arrayProd.push(id, idUser)
        } else {
            console.log('deu com os boi na agua')
            return
        }
        console.log('............', arrayProd)

    }



    if (!dataProd) {
        return null
    }
    return (
        <>

            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PRODUTOS DESSA LOJA</Center>
                    {isVisible &&
                        <Alert mb={5} status='success'>
                            <AlertIcon />
                            Produto adicionado ao carrinho!
                        </Alert>
                    }
                    <Flex justifyContent={'space-around'} gap={10}>
                        {dataProd.map(product => (
                            < ProductCard key={product.prodid}
                                name={product.nome_prod}
                                img={product.foto_prod || 'https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={product.descricao_prod || 'Short rosa de academia, leve e confortável.'}
                                types={[`${product.tipo_prod}, ${product.tamanho_prod}`]}
                                clickOnLink={() => handleCart(product.prodid)}
                            />

                        ))}
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}