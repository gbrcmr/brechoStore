import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link, Text, Image, Spinner } from '@chakra-ui/react'
import api from "../services/api"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

export const PaymentPage = () => {

    const [loc, setLoc] = useState('');
    const [pixImagem, setPixImagem] = useState('');
    const [pixTexto, setPixTexto] = useState('');
    const [pixStatus, setPixStatus] = useState('');
    const [expiredDate, setExpiredDate] = useState('');
    const [loading, setLoading] = useState(true);

    const { user } = useAuth()
    const navigate = useNavigate()

    function getLastPartOfURL(url) {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1];
    }


    const url = window.location.href;
    const txid = getLastPartOfURL(url);

    setTimeout(() => {
        setLoading(false)
    }, 3000);


    setInterval(() => {
        getPix()
    }, 7000);

    useEffect(() => {
        console.log('AAAAAAAAAAA', pixStatus)
        if (pixStatus === 'CONCLUIDA') {

            redirectAndSendEmail()
        }
    }, [pixStatus]);

    const redirectAndSendEmail = async () => {
        try {
            const response = await api.post('/send', {
                toEmail: user[0].email,
                emailBody: '<h1><center>Atualização do seu pedido! Pagamento confirmado!</center></h1> <p><h3>Agradecemos a sua compra!</h3></p><p>  <p>Prezado(a) Cliente,</p><p> Gostaríamos de informá- lo que nossas entregas são realizadas todas as <b>quartas-feiras</b> e <b>sábados</b>, no período das <b>19h</b> às <b>21h</b>.Pedimos que fique atento(a) a esses horários para receber suas encomendas com comodidade.</p><p>A entrega será feita no endereço: <b>Avenida Júlio de Castilhos, 3136</b>.</p><p>Agradecemos pela sua preferência e estamos à disposição para qualquer dúvida.</p><p><img src="https://raw.githubusercontent.com/Gu1mot4/brechoStore/main/Logo%20Brecho%20V2.png"><h3></p>'
            });

            console.log(response.data);

            navigate('/checkout/payment/confirmed');
            return response.data;

        } catch (error) {
            console.error('Erro ao enviar email:', error);

        }
    };




    const getPix = async () => {
        try {
            console.log('entrou')
            const response = await api.get(`/api/details/${txid}`);
            console.log('eaii', response.data.calendario.criacao)

            let date = new Date(response.data.calendario.criacao);

            // Adicionar 1 hora
            date.setHours(date.getHours() - 2);

            // Extrair partes da data
            let dia = String(date.getUTCDate()).padStart(2, '0');
            let mes = String(date.getUTCMonth() + 1).padStart(2, '0'); // Os meses são baseados em zero, por isso adicionar 1
            let ano = date.getUTCFullYear();
            let hora = String(date.getUTCHours()).padStart(2, '0');
            let minuto = String(date.getUTCMinutes()).padStart(2, '0');
            let segundo = String(date.getUTCSeconds()).padStart(2, '0');

            // Formatar a data no estilo brasileiro
            let expiredDate = `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;

            setExpiredDate(expiredDate);







            const data = await response.data.loc.id;
            setPixStatus(response.data.status)
            setLoc(data)
            return response.data.status
        } catch (error) {
            console.error('Erro catch getPix:', error);
        }

    }

    const getQrCode = async () => {
        try {

            const response = await api.get(`/api/pixQrCode/${loc}`);
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
                    <Center mb={5} fontWeight={700}>PIX PARA PAGAMENTO DO PEDIDO</Center>
                    {loading &&
                        <Flex justifyContent={'center'} wrap={'wrap'}>
                            <Spinner color="green" size={'xl'} />
                        </Flex>
                    }
                    {!loading &&
                        <Flex justifyContent={'center'} wrap={'wrap'}>
                            <Flex direction={"column"}>
                                <Image boxSize='300px' src={pixImagem} alt={'QR Code PIX'}></Image>
                                <Text mt={5} maxWidth={300}>{pixTexto}</Text>
                                <Text mt={5} maxWidth={300} fontWeight="bold" textAlign="center">Prazo para pagamento:</Text>
                                <Text mt={2} maxWidth={300} fontWeight="bold" textAlign="center">{expiredDate}</Text>
                            </Flex>
                        </Flex>
                    }
                </Grid>
            </SidebarWithHeader >
        </>
    )
}