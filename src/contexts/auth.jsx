import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");
        const usersStorage = localStorage.getItem("users_db");

        if (userToken && usersStorage) {
            const hasUser = JSON.parse(usersStorage).find(
                (storedUser) => storedUser.email === JSON.parse(userToken).email
            );

            if (hasUser) {
                setUser(hasUser[0])
            }

        }
    }, []);

    const signIn = async (email, password) => {
        return await api.post('login', {
            email: email,
            senha: password
        });
    };

    const signUp = async (email, password) => {
        const usersStorage = JSON.parse(localStorage.getItem("users_db"));

        const hasUser = usersStorage?.filter((user) => user.email === email)

        if (hasUser?.length) {
            return "Esse email já está cadastrado"
        }

        let uuid = uuidv4();

        if (usersStorage) {
            newUser = [...usersStorage, { email, password }];
        } else {
            newUser = [{ email, password }]
        }

        console.log(JSON.stringify(newUser));


        return await axios.store("/cadaster", email, password);
    }

    const signOut = () => {
        setUser(null);
        localStorage.removeItem("user_token")
    };

    return (
        <AuthContext.Provider
            value={{ user, signed: !!user, signIn, signUp, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};