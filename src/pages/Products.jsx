import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Alert, AlertIcon, ScaleFade, useToast } from '@chakra-ui/react'
import { useState, useEffect } from "react"
import api from "../services/api"
import useAuth from "../hooks/useAuth"

export const Products = () => {


    const [dataProd, setDataProd] = useState();
    const [dataStore, setDataStore] = useState();
    const [dataCart, setDataCart] = useState();
    const [hasAdd, setHasAdd] = useState(false);
    const { cart, setCart, user } = useAuth();

    var url = window.location.href;
    var urlParts = url.split('/');
    var storeId = urlParts[urlParts.length - 1]
    let productArray = []
    let arrayProd = []

    const userToken = localStorage.getItem("user_token");
    const parsedToken = JSON.parse(userToken);
    const idUser = parsedToken.userid;

    const toast = useToast()

    //console.log(arrayProd)

    //console.log(storeId)

    const getdataStore = async (id) => {
        try {
            const response = await api.get(`/store/data/${id}`);

            setDataStore(response.data[0])
            console.log('TESTEEEEEEEE', response.data[0])
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
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

    const cartById = async (userId) => {
        try {
            const response = await api.get(`/cart/${userId}`);
            console.log("Carrinnnnnnnho:", response.data[0].carrinho);
            setDataCart(response.data[0].carrinho)
            setCart(response.data[0].carrinho.length)

            //console.log(response.data[0].carrinho);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }

    useEffect(() => {
        cartById(idUser);
        getdataStore(storeId)
        getProducts();
    }, []);

    useEffect(() => {
        console.log('oi')
        cartById(idUser);
    }, [hasAdd]);

    productArray.push(dataProd)

    const showAlertSucess = () => toast({
        position: 'bottom-left',
        title: 'Produto adicionado ao carrinho!',
        description: "O produto foi adicionado com sucesso ao carrinho",
        status: 'success',
        duration: 5000,
        isClosable: true,
    })

    const showAlertFaiulure = () => toast({
        position: 'bottom-left',
        title: 'Erro ao adicionar produto ao carrinho',
        description: "Não é possivel adicionar produtos repetidos ao carrinho",
        status: 'error',
        duration: 5000,
        isClosable: true,
    })

    const showAlertWarning = () => toast({
        position: 'bottom-left',
        title: 'Erro ao adicionar produto ao carrinho',
        description: "Não é possivel adicionar produtos de lojas diferentes no carrinho",
        status: 'warning',
        duration: 5000,
        isClosable: true,
    })

    const addStoreId = async (id, idUser) => {
        try {
            console.log('NEXTEL', user[0].lojaid_carrinho)
            if (user[0].lojaid_carrinho === null) {
                addToCart(id, idUser)
                await api.put(`/cart/register/${idUser}/${storeId}`);
                return
            } if (user[0].lojaid_carrinho !== storeId) {
                showAlertWarning()
                return
            } else {
                addToCart(id, idUser)
                return
            }
        } catch (error) {
            console.log('ERROOOO')
        }

    }


    const addToCart = async (prodid, userid) => {
        try {
            console.log('add to cart: ', prodid)
            const response = await api.put(`/cart/add/${userid}/${prodid}`);
            console.log('MOORGAN', dataCart)

            console.log('CCCCCCCCCCCCCCCCCCC', response.data.carrinho)
            if (dataCart === undefined || null || []) {
                addStoreId(userid)
                setDataCart[response.data.carrinho]
            } else {
                setDataCart(prevList => [...prevList, response.data.carrinho])
                setCart(response.data[0].carrinho.length)
            }
            showAlertSucess();

            if (hasAdd == false) {
                setHasAdd(true)
                return
            }
            if (hasAdd == true) {
                setHasAdd(false)
                return
            }
        } catch (error) {
            console.error("Erro ao adicionar produtos", error);
            throw error;
        }
    }


    const handleCart = (id) => {
        try {
            console.log('PARAPARAPARA', cart)
            console.log('ÁAAAAAAA', id)
            let found = dataCart?.find((element) => element === id);
            if (found === undefined) {
                console.log('deu boa', idUser)
                addStoreId(id, idUser)


                return
            } else {
                throw error
            }
        } catch (error) {
            console.log('ERROOOO')
            showAlertFaiulure()
        }

    }



    if (!dataProd) {
        return null
    }
    return (
        <>

            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PRODUTOS DESSA LOJA</Center>
                    <Flex justifyContent={'space-around'} gap={10} wrap={'wrap'}>
                        {dataProd.map(product => (
                            !product.desativado &&
                            < ProductCard key={product.prodid}
                                name={product.nome_prod}
                                img={product.foto_prod || 'https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={product.descricao_prod || 'Short rosa de academia, leve e confortável.'}
                                types={[`${product.tipo_prod}, ${product.tamanho_prod}`]}
                                price={product.preco_prod}
                                clickOnLink={() => handleCart(product.prodid)}
                                instagram={dataStore.instagram || ''}
                                phone={dataStore.telefone_loja}
                            />

                        ))}
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}