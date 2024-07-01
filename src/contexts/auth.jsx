import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [store, setStore] = useState(null);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");
        const storeToken = localStorage.getItem("store_token");
        const storeStorage = localStorage.getItem("stores_db");

        if (userToken && usersStorage) {
            const parsedToken = JSON.parse(userToken);
            const users = JSON.parse(usersStorage);

            const existingUser = users.find(
                (storedUser) => storedUser.email === parsedToken.email
            );

            if (existingUser) {
                findUser(existingUser.id);
            }
        }
    }, []);

    const findUser = async (userId) => {
        try {
            console.log(userId)
            const response = await api.get(`/search/${userId}`);
            setUser(response.data)
            setCart(response.data[0].carrinho.length || []);

        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            throw error;
        }
    }

    const signIn = async (email, password) => {
        try {
            const response = await api.post('login', {
                email: email,
                senha: password
            });

            if (response.data) {
                console.log('eeeee', response.data.carrinho)
                setUser(response.data);
                setCart(response.data.carrinho)
                localStorage.setItem("user_token", JSON.stringify(response.data));
            }

            return response;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const signUp = async (name, email, password, phone, cpf) => {
        try {
            const usersStorage = JSON.parse(localStorage.getItem("users_db")) || [];

            const existingUser = usersStorage.find((user) => user.email === email);

            if (existingUser) {
                return "Esse email já está cadastrado";
            }

            const newUser = {
                id: uuidv4(),
                name: name,
                email: email,
                password: password,
                phone: phone,
                cpf: cpf,
            };

            const updatedUsers = [...usersStorage, newUser];
            localStorage.setItem("users_db", JSON.stringify(updatedUsers));

            const response = await api.post("/cadaster", {
                userid: newUser.id,
                nome: name,
                email: email,
                senha: password,
                telefone: phone,
                cpf: cpf,
            });

            if (response.data) {
                setUser(response.data);
                localStorage.setItem("user_token", JSON.stringify(response.data));
            }

            console.log(".................", user)

            return response;
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            throw error;
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    const createStore = async (storeName, storeEmail, storePhone, storeInstagram, photoStore, cep_loja, endereco_loja, numero_loja) => {
        const user = JSON.parse(localStorage.getItem('user_token'));
        try {
            const storeStorage = JSON.parse(localStorage.getItem("stores_db")) || [];

            // const existingStore = storeStorage.find((store) => store.name === nome_loja);

            // if (existingStore) {
            //     return "Esse nome de já está cadastrado";
            // }

            const newStore = {
                lojaid: uuidv4(),
                userid: user.userid,
                nome_loja: storeName,
                email_loja: storeEmail,
                instagram: storeInstagram,
                telefone_loja: storePhone,
                foto_loja: photoStore,
                cep_loja,
                endereco_loja,
                numero_loja
            };

            const updatedStore = [...storeStorage, newStore];
            localStorage.setItem("stores_db", JSON.stringify(updatedStore));

            const response = await api.post("/store/cadaster", {
                lojaid: uuidv4(),
                userid: newStore.userid,
                nome_loja: storeName,
                email_loja: storeEmail,
                telefone_loja: storePhone,
                instagram: storeInstagram,
                foto_loja: photoStore,
                cep_loja,
                endereco_loja,
                numero_loja
            });

            if (response.data) {
                setStore(response.data);
                localStorage.setItem("store_token", JSON.stringify(response.data));
            }

            return response;
        } catch (error) {
            console.error("Erro ao cadastrar loja:", error);
            throw error;
        }
    };

    const createProduct = async (descriptionProduct, sizeProduct, typeProduct, nameProduct, photoProduct, priceProduct) => {
        const store = JSON.parse(localStorage.getItem('store_token'));
        try {
            const productStorage = JSON.parse(localStorage.getItem("product_db")) || [];

            // const existingStore = storeStorage.find((store) => store.name === nome_loja);

            // if (existingStore) {
            //     return "Esse nome de já está cadastrado";
            // }

            const newProduct = {
                prodid: uuidv4(),
                lojaid: store.lojaid,
                descricao_prod: descriptionProduct,
                tamanho_prod: sizeProduct,
                tipo_prod: typeProduct,
                nome_prod: nameProduct,
                foto_prod: photoProduct,
                preco_prod: priceProduct
            };

            const updatedProducts = [...productStorage, newProduct];
            localStorage.setItem("stores_db", JSON.stringify(updatedProducts));

            const response = await api.post("/store/add", {
                prodid: uuidv4(),
                lojaid: newProduct.lojaid,
                descricao_prod: descriptionProduct,
                tamanho_prod: sizeProduct,
                tipo_prod: typeProduct,
                nome_prod: nameProduct,
                foto_prod: photoProduct,
                preco_prod: priceProduct
            });

            if (response.data) {
                setStore(response.data);
                localStorage.setItem("product_token", JSON.stringify(response.data));
            }

            return response;
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            throw error;
        }
    };

    console.log(user)

    return (
        <AuthContext.Provider
            value={{ user, cart, setCart, signed: !!user, signIn, signUp, signOut, createStore, createProduct }}
        >
            {children}
        </AuthContext.Provider>
    );
};