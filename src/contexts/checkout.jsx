import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export const CheckoutContext = createContext({});

export const CheckoutProvider = ({ children }) => {
    const [dataCart, setDataCart] = useState([]);
    const [productList, setProductList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { cart, user } = useAuth()

    const [cpfClient, setCpfClient] = useState();
    const [nameClient, setNameClient] = useState();

    const userToken = localStorage.getItem("user_token");
    const parsedToken = JSON.parse(userToken);
    const idUser = parsedToken.userid;

    const cartById = async (userId) => {
        try {
            const response = await api.get(`/cart/${userId}`);
            return response.data[0].carrinho || [];
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

    const getUser = async (id) => {
        try {
            const response = await api.get(`/search/${id}`);
            setNameClient(response.data[0].nome)
            setCpfClient(response.data[0].cpf)
            console.log(nameClient)
            console.log(cpfClient)
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }

    const fetchProducts = async () => {
        const oi = await cartById(idUser);

        console.log('MIMIMIMI', oi)
        console.log('DATAAAAA', dataCart)
        if (Array.isArray(oi)) {
            const products = await Promise.all(oi.map(item => getProductsByProductId(item)));
            setProductList(products);
            const allPrices = await Promise.all(products.map(item => parseFloat(item.preco_prod)));
            const sumWithInitial = allPrices.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
            );
            setTotalPrice(sumWithInitial)
        } else {
            console.error("dataCart is not an array", dataCart);
        }
    };

    useEffect(() => {
        cartById(idUser);
        getUser(idUser);
    }, [idUser]);

    useEffect(() => {
        cartById(idUser);
        fetchProducts();
    }, [cart]);

    const deleteCart = async (prodid, userid) => {
        try {
            const response = await api.delete(`/cart/delete/${userid}/${prodid}`);
            setDataCart(prevDataCart => prevDataCart.filter(item => item !== prodid));
        } catch (error) {
            console.error("Erro ao deletar produto", error);
            throw error;
        }
    }



    return (
        <CheckoutContext.Provider
            value={{ dataCart, idUser, productList, totalPrice, nameClient, cpfClient }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};