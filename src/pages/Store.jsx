import ProductCard from "../components/ProductCard"
import { Search } from "../components/Search"
import SidebarWithHeader from "../components/SidebarWithHeader"
import StoreCard from "../components/StoreCard"
import AddCard from "../components/AddCard"
import { Grid, GridItem, Center, Flex, Spacer } from '@chakra-ui/react'
import { Products } from './Products'
import ProductCardEditable from "../components/ProductCardEditable"

export const Store = () => {
    return (
        <>
            <SidebarWithHeader>
                <Grid>
                    <Center mb={5} fontWeight={700}>SEUS PRODUTOS</Center>
                    <Flex justifyContent={'space-around'} gap={10} wrap={'wrap'}>
                        <ProductCardEditable
                            name={'Short de Academia'}
                            img={'https://images.unsplash.com/photo-1588689653274-cd16f09dc67b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Short rosa de academia, leve e confortável.'}
                            types={['Short, P']}
                        />
                        <ProductCardEditable
                            name={'Tênis Puma Branco'}
                            img={'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Tênis da marca Puma com pouco tempo de uso.'}
                            types={['Tênis, 42']}
                        />
                        <ProductCardEditable
                            name={'Casaco Jeans'}
                            img={'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                            description={'Casaco de material Jeans, tamanho M.'}
                            types={['Roupas, M']}
                        />
                        <AddCard />
                    </Flex>
                </Grid>
            </SidebarWithHeader >
        </>
    )
}