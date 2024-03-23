import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer } from '@chakra-ui/react'

export const Favorites = () => {
    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>SEUS FAVORITOS</Center>
                    <Flex justifyContent={'space-around'} gap={10}>
                        <ProductCard
                            name={'Air Force 1'}
                            img={'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Air Force 1 com pouco uso, tamanho 39'}
                            types={['Tênis, 39']}
                        />
                        <ProductCard
                            name={'Camiseta preta estampada'}
                            img={'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Camiseta preta ainda com etiqueta.'}
                            types={['Roupas, P']}
                        />
                        <ProductCard
                            name={'Moletom branco'}
                            img={'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Moletom branco sem encardimento.'}
                            types={['Roupas, GG']}
                        />
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}

export default Favorites