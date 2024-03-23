import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer, Link } from '@chakra-ui/react'

export const Home = () => {
    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>LOJAS RECOMENDADAS PARA VOCÊ</Center>
                    <Flex justifyContent={'space-around'} wrap={'wrap'} gap={10}>
                        <Link href="/products" _hover={{ textDecoration: "none" }}>
                            <StoreCard
                                name={'Loja do seu Zé'}
                                img={'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={'Loja do seu zé, um lugar aconchegante'}
                                types={['Roupas, botas']}
                            />
                        </Link>
                        <Link href="/products" _hover={{ textDecoration: "none" }}>
                            <StoreCard
                                name={'Importados S/A'}
                                img={'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={'Selecionados da Serra'}
                                types={['Roupas, botas']}
                            />
                        </Link>
                        <Link href="/products" _hover={{ textDecoration: "none" }}>
                            <StoreCard
                                name={'Vantage do Vini'}
                                img={'https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?q=80&w=2043&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                description={'Vintage do Vini, onde nenhum produto sai de moda'}
                                types={['Roupas, botas']}
                            />
                        </Link>
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}