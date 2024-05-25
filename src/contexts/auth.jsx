import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [store, setStore] = useState(null);

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
                setUser(existingUser);
            }
        }
    }, []);

    const signIn = async (email, password) => {
        try {
            const response = await api.post('login', {
                email: email,
                senha: password
            });

            if (response.data) {
                setUser(response.data);
                localStorage.setItem("user_token", JSON.stringify(response.data));
            }

            return response;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    };

    const signUp = async (name, email, password, phone) => {
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
                phone: phone
            };

            const updatedUsers = [...usersStorage, newUser];
            localStorage.setItem("users_db", JSON.stringify(updatedUsers));

            const response = await api.post("/cadaster", {
                userid: newUser.id,
                nome: name,
                email: email,
                senha: password,
                telefone: phone
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

    const createStore = async (storeName, storeEmail, storePhone, storeInstagram) => {
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
                telefone_loja: storePhone
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

    const createProduct = async (descriptionProduct, sizeProduct, typeProduct, nameProduct, photoProduct) => {
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
                foto_prod: photoProduct
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
                foto_prod: photoProduct
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
    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signIn, signUp, signOut, createStore, createProduct }}
        >
            {children}
        </AuthContext.Provider>
    );
};