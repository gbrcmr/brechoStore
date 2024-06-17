import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Cadaster } from './pages/Cadaster'
import { StoreCadaster } from './pages/StoreCadaster'
import { Orders } from './pages/Orders'
import { Cart } from './pages/Cart'
import { Profile } from './pages/Profile'
import { Checkout } from './pages/Checkout'
import { Products } from './pages/Products'
import { Store } from './pages/Store'
import { Favorites } from './pages/Favorites'
import { PaymentPage } from './pages/PaymentPage'
import { useParams } from 'react-router-dom'

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cadaster' element={<Cadaster />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/store/cadaster' element={<StoreCadaster />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/payment' element={<PaymentPage />} />
            <Route path='/products' element={<Products />} />
            <Route path='/store/' element={<Store />} />\
            <Route path='/store/:storeId' element={<Products />} />
            <Route path='/favorites' element={<Favorites />} />

        </Routes>
    )
}