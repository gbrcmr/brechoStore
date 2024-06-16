import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from "../services/api";

export const CheckoutContext = createContext({});

export const CheckoutProvider = ({ children }) => {
    const [dataCart, setDataCart] = useState([]);
    const [productList, setProductList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const userToken = localStorage.getItem("user_token");
    const parsedToken = JSON.parse(userToken);
    const idUser = parsedToken.userid;

    const cartById = async (userId) => {
        try {
            const response = await api.get(`/cart/${userId}`);
            console.log("Cart data:", response.data[0].carrinho);
            setDataCart(response.data[0].carrinho || []);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }

    const getProductsByProductId = async (prodId) => {
        try {
            const response = await api.get(`/cart/product/${prodId}`);
            return response.data[0];
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }


    const calcTotalPrice = async () => {
        try {
            const response = await api.get(`/cart/product/${prodId}`);
            return response.data[0];
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }

    useEffect(() => {
        cartById(idUser);
    }, [idUser]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (Array.isArray(dataCart)) {
                const products = await Promise.all(dataCart.map(item => getProductsByProductId(item)));
                setProductList(products);
                const allPrices = await Promise.all(products.map(item => parseFloat(item.preco_prod)));
                console.log('LAAAAA', allPrices)
                const sumWithInitial = allPrices.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0,
                );
                setTotalPrice(sumWithInitial)
            } else {
                console.error("dataCart is not an array", dataCart);
            }
        };

        fetchProducts();
    }, [dataCart]);

    useEffect(() => {
        console.log('FALAAA', totalPrice)
    }, [totalPrice]);

    const deleteCart = async (prodid, userid) => {
        try {
            const response = await api.delete(`/cart/delete/${userid}/${prodid}`);
            setDataCart(prevDataCart => prevDataCart.filter(item => item !== prodid));
        } catch (error) {
            console.error("Erro ao deletar produto", error);
            throw error;
        }
    }

    console.log('wwwww', productList)


    return (
        <CheckoutContext.Provider
            value={{ dataCart, idUser, productList, totalPrice }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};