import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import { Grid, GridItem, Center, Flex, Spacer } from '@chakra-ui/react'

export const Products = () => {
    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>PRODUTOS DESSA LOJA</Center>
                    <Flex justifyContent={'space-around'} gap={10}>
                        <ProductCard
                            name={'Camisa preta'}
                            img={'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Camiseta preta sem estampa tamanho M.'}
                            types={['Camiseta, M']}
                        />
                        <ProductCard
                            name={'Bota gasta marrom'}
                            img={'https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'bota marrom gasta, o que dá um efeito vintage. Tamanho 40'}
                            types={['Tênis, 40']}
                        />
                        <ProductCard
                            name={'Calça jeans preta'}
                            img={'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Calça jeans preta, pouco uso. Tamanho G'}
                            types={['Roupas, botas']}
                        />
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}