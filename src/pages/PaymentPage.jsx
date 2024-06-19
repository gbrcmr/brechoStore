import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link, Text, Image } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"

export const PaymentPage = () => {

    const [qrCode, setQrCode] = useState('');
    const [loc, setLoc] = useState('');
    const [pixImagem, setPixImagem] = useState('');
    const [pixTexto, setPixTexto] = useState('');
    const teste = "data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAAAklEQVR4AewaftIAAAxkSURBVO3BQW4ky5LAQDKh+1+Zo6WvAkhUqV/Mh5vZL9ZaV3hYa13jYa11jYe11jUe1lrXeFhrXeNhrXWNh7XWNR7WWtd4WGtd42GtdY2HtdY1HtZa13hYa13jYa11jYe11jV++JDKv1QxqUwVb6hMFZPKScWkMlVMKlPFJ1Q + UXGiMlVMKlPFicobFScqU8Wk8i9VfOJhrXWNh7XWNR7WWtewX3xAZar4JpWp4kTlpOKbVE4qJpVPVLyhMlWcqHxTxYnKN1VMKlPFN6lMFZ94WGtd42GtdY2HtdY1fvhjKm9U / CWVNyomlaliUplUpopJZar4hMpUMal8ouINlZOKSWWqmFS + SeWNir / 0sNa6xsNa6xoPa61r / PD / nMpUMam8UfGGylQxqUwqU8Wk8kbFiconKk5UpopPVLxR8b / kYa11jYe11jUe1lrX + OF / XMWJyhsVb1RMKpPKVDGpnKi8UXGiMqmcVJxUTConKlPFVPG / 7GGtdY2HtdY1HtZa1 / jhj1X8SypTxaRyojJVTCpTxaQyVUwVk8obFW + ofKJiUjlRmSqmipOKSWWq + KaKmzysta7xsNa6xsNa6xo / fJnKf6liUpkqJpWpYlKZKiaVqWJSmSq + SWWqeENlqphUpopJZaqYVKaKSWWqeENlqjhRudnDWusaD2utazysta5hv / h / TGWqmFROKiaVv1TxhspU8YbKX6qYVKaKv6QyVfx / 9rDWusbDWusaD2uta / zwIZWp4g2VqWJS + UTFpPJGxaQyVbyhMlW8ofKJijdU3qiYVKaKN1SmiqliUvmmihOVqeITD2utazysta7xsNa6hv3iH1I5qThReaNiUvlExRsqU8UbKp + oOFGZKk5UTipOVKaKSeWk4g2Vv1TxTQ9rrWs8rLWu8bDWusYPf0zlEypTxaQyVUwqJxUnKicqJxWfqJhUpopJZVKZKt5Q + YTKVPEJlU9UnKi8oTJVfOJhrXWNh7XWNR7WWtewX3xA5Y2KE5WpYlKZKiaVqWJSOamYVP5SxV9SmSpOVKaKv6RyUjGpvFFxovKJim96WGtd42GtdY2HtdY17BdfpDJVTCpTxaTyRsWJylQxqUwVJyonFZPKGxWTylQxqZxUnKhMFZPKVPGGylRxojJVnKhMFZPKGxWTylQxqUwVn3hYa13jYa11jYe11jV++JDKGxVvVEwqb1S8oTJVTBWTyhsVJyonKp9QmSq + SWWqmFROKiaVqeJEZaqYVKaKmzysta7xsNa6xsNa6xr2iy9S + UsVk8pUMalMFScqJxUnKicVk8pJxTepfFPFpHJSMalMFZPKJyomlaliUpkqJpWp4pse1lrXeFhrXeNhrXWNHz6k8omKT1RMKicqU8UnVN5QOak4UZkqvqliUpkqTipOVKaKSeWNiknlDZWp4r / 0sNa6xsNa6xoPa61r / PChikllqphU3lCZKt6omFQ + oTJVnKh8U8Wk8pcqPqHyiYpJZVI5UfmEylQxqUwVn3hYa13jYa11jYe11jXsFx9QmSomlU9UfJPKVHGi8omKE5WTikllqphUTiomlZOKSWWqmFROKv6XqEwVn3hYa13jYa11jYe11jV++DKVk4o3VL6p4o2KSWWqeEPlDZWp4o2Kk4pJ5Q2VT6hMFd + kclLxhspfelhrXeNhrXWNh7XWNX74UMWkcqIyVUwqU8WJylQxqUwqU8UbFZPKScVUMamcVJyonKicVJyo3ExlqviEyhsV3 / Sw1rrGw1rrGg9rrWvYLz6g8kbFGyonFZPKScWkMlX8JZVPVJyoTBXfpPJNFZPKScUbKm9UTCpTxaQyVXziYa11jYe11jUe1lrX + OFDFScqk8pUcVIxqZxUTCqTylRxovJGxaQyVUwqJxWTyknFicpJxaTyTRWTylQxqbyhMlWcqJxU / EsPa61rPKy1rvGw1rqG / eKLVKaKSeUvVfwllZOKN1SmiknlmyomlaniRGWq + CaVqeJE5S9VnKhMFZ94WGtd42GtdY2HtdY1fviQylTxiYo3VCaVk4pJZaqYVE4q3lCZKiaVk4o3VE4qJpWp4l + qmFTeqHhD5Q2Vv / Sw1rrGw1rrGg9rrWv88MdUpopJ5URlqvgvVZyoTBVTxTepTBUnKm + onKhMFW + oTBUnFZPKicpU8YbKv / Sw1rrGw1rrGg9rrWv88KGKSWWq + ETFJypOKt5QmSqmihOVqeITFd9UcaIyVZyovKHyTRV / qeKbHtZa13hYa13jYa11DfvFB1SmihOVf6niROWNikllqphUTipOVL6pYlI5qThRmSpOVN6omFRuUvFND2utazysta7xsNa6xg + XqXhDZaqYVN6o + KaKE5Wp4hMVb1RMKpPKScWJylQxqUwVb1RMKlPFpDJVTConFX / pYa11jYe11jUe1lrXsF98QGWqmFSmiknljYoTlZOKE5WTihOVqeJE5aTiROWNik + onFScqEwVk8pJxRsqb1RMKm9UfOJhrXWNh7XWNR7WWtf44ctUpopJZap4Q2WqmCpOVKaKqeJEZap4Q + UTKlPFpDJVTCpTxScqJpWpYqr4JpWpYqo4UZlUTiomlW96WGtd42GtdY2HtdY1fvhQxRsVb6hMFZPKGxX / kspJxaTyhspU8QmVqeITKm9UfELlpGKqmFSmikllqvimh7XWNR7WWtd4WGtd44cPqZxUTCpTxUnFScWk8gmVqWKqmFROKr6pYlKZVE4qJpV / qeK / pDJVnKhMFX / pYa11jYe11jUe1lrXsF98QGWqeEPljYpPqEwVk8p / qeJEZaqYVE4qTlS + qeJEZaqYVE4qJpVPVJyonFR84mGtdY2HtdY1HtZa1 / jhy1ROKqaKSWWq + C9VnKj8JZWp4qRiUplUpoqpYlKZKiaVqeJE5UTlExWTylQxqUwqU8VJxTc9rLWu8bDWusbDWusa9osPqJxUvKFyUnGiMlX8JZWpYlKZKiaVNyomlW + q + CaVk4pJZap4Q + Wk4kTlpOIvPay1rvGw1rrGw1rrGj98qOINlanipGJSmSqmik + ovFFxUjGpnFScqEwVJypvqEwVk8pU8S + pnFRMKpPKJ1Smim96WGtd42GtdY2HtdY1fviQylQxqXxCZaqYVL6p4kTlROWNihOVqeJEZaqYVE4q3lB5o + Kk4o2KSeWkYlKZKk5U / tLDWusaD2utazysta5hv / iAylRxovJGxaRyUnGiMlW8oXJSMalMFd + k8kbFJ1ROKiaVqeINlU9UTCpTxSdUpopPPKy1rvGw1rrGw1rrGvaLL1KZKt5QOak4UTmpmFSmikllqphUTipOVD5RMalMFZPKVHGiclLxhso3VUwqJxU3e1hrXeNhrXWNh7XWNewXX6TyRsUbKicVk8pJxaQyVZyoTBWTyknFpDJVnKhMFZ9QeaNiUjmpOFGZKj6hclIxqbxR8U0Pa61rPKy1rvGw1rrGDx9SeaPiDZWTipOKNyomlW + qeEPlDZVPVEwqb1S8oTJVvKHyCZWbPKy1rvGw1rrGw1rrGj98qOIvVZyoTBWTyknFScWk8kbFpPKJijdUpopJ5RMqU8WkclIxqUwVb1S8oXJSMan8pYe11jUe1lrXeFhrXeOHD6n8SxUnKlPFiconKiaVqeIvqUwVb1RMKlPFiconVE5UPqEyVXyTylTxiYe11jUe1lrXeFhrXeOHL6v4JpWTiknlROWNikllUpkqJpWTihOVk4pvqjhRmSomlTcq3lB5o + KNiv / Sw1rrGg9rrWs8rLWu8cMfU3mj4g2VE5WpYlKZKiaVqeKbVN5Q + SaVb6qYVKaKE5WTikllUvkmlaliUvmmh7XWNR7WWtd4WGtd44f / 5yomlROVE5WpYlL5RMUnVKaKSeWNiknlZipTxYnKVHGiMlX8Sw9rrWs8rLWu8bDWusYP / 2MqJpWpYlI5UZkqJpWpYlI5UZkq3lA5qZhUpopvUpkqJpWp4qRiUplU / pLKScU3Pay1rvGw1rrGw1rrGj / 8sYqbqEwVk8qJylQxqZyonKh8ouINlaliUpkqTiq + SeUTFScqU8WkMlX8pYe11jUe1lrXeFhrXeOHL1P5l1TeqJhUPqEyVUwqU8U3qZyofKLiEyqfqJhUpooTlZOKk4oTlaniEw9rrWs8rLWu8bDWuob9Yq11hYe11jUe1lrXeFhrXeNhrXWNh7XWNR7WWtd4WGtd42GtdY2HtdY1HtZa13hYa13jYa11jYe11jUe1lrXeFhrXeP / AJ7cxR0uDTiRAAAAAElFTkSuQmCC"
    const rawPix = "00020101021226830014BR.GOV.BCB.PIX2561qrcodespix.sejaefi.com.br/v2/49a1491c4959445a8a7672b6aa7b1f325204000053039865802BR5905EFISA6008SAOPAULO62070503***6304F151"


    function getLastPartOfURL(url) {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }


    const url = window.location.href;
    const txid = getLastPartOfURL(url);
    console.log('oi', 'oi');

    const oioi = async () => {
        console.log('ssssss')
    }

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

    // const getCharges = async () => {
    //     try {
    //         const response = await api.get(`/api/external`);
    //         console.log(response.data.cobs)
    //         const resolutionArray = response.data.cobs.filter((item) => item.txid === txid)
    //         setPixImagem(resolutionArray[0].pixCopiaECola)
    //         setLoc(resolutionArray[0].loc.id)

    //     } catch (error) {
    //         console.error("Erro ao buscar produtos", error);
    //     }
    // };

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
                    <Center mb={5} fontWeight={700}>PIX PARA PAGAMENTO DO PEDIDO</Center>
                    <Flex justifyContent={'center'} wrap={'wrap'}>
                        <Flex direction={"column"}>
                            <Image boxSize='300px' src={pixImagem} alt={'QR Code PIX'}></Image>
                            <Text mt={5} maxWidth={300}>{pixTexto}</Text>
                        </Flex>
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}