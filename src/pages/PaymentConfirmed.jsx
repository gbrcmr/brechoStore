
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link, Text, Image, Spinner } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"
import { CheckCircleIcon } from "@chakra-ui/icons"
import Lottie from 'react-lottie'
import animationData from '../assets/payment.json'

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



    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center fontWeight={700}>PEDIDO PAGO!</Center>


                    <Flex justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                        <Lottie
                            options={defaultOptions}
                            height={500}
                            width={500}
                        />
                        <Text justifyContent={'center'}>Seu pedido foi pago com sucesso! Agora é só aguardar a entrega!</Text>
                    </Flex>


                </Grid>
            </SidebarWithHeader >
        </>
    )
}