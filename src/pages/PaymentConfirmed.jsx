
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link, Text, Image, Spinner } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"
import { CheckCircleIcon } from "@chakra-ui/icons"

export const PaymentConfirmed = () => {

    const [loc, setLoc] = useState('');
    const [pixImagem, setPixImagem] = useState('');
    const [pixTexto, setPixTexto] = useState('');
    const [loading, setLoading] = useState(true);

    function getLastPartOfURL(url) {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }


    const url = window.location.href;
    const txid = getLastPartOfURL(url);

    setTimeout(() => {
        setLoading(false)
    }, 3000);

    const getPix = async () => {
        try {
            console.log('entrou')
            const response = await api.get(`/api/details/${txid}`);
            const data = await response.data.loc.id;
            setLoc(data)
        } catch (error) {
            console.error('Erro catch getPix:', error);
        }

    }

    const getQrCode = async () => {
        try {
            console.log('opa', loc)
            const response = await api.get(`/api/pixQrCode/${loc}`);
            console.log(response.data)
            setPixImagem(response.data.imagemQrcode)
            setPixTexto(response.data.qrcode)

        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    useEffect(() => {
        if (pixImagem !== '') {
            console.log(pixImagem)
        }
        if (loc !== '') {
            getQrCode();
        } else {
            getPix()
        }
    }, [loc, pixImagem]);

    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PEDIDO PAGO!</Center>
                    {loading &&
                        <Flex justifyContent={'center'} wrap={'wrap'}>
                            <Spinner color="green" size={'xl'} />
                        </Flex>
                    }
                    {!loading &&
                        <Flex justifyContent={'center'} wrap={'wrap'}>
                            <Flex direction={"column"}>
                                <CheckCircleIcon boxSize={26} />
                                <Text mt={5} maxWidth={300}>{pixTexto}</Text>
                            </Flex>
                        </Flex>
                    }
                </Grid>
            </SidebarWithHeader >
        </>
    )
}