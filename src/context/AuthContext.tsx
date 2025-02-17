import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL: string  = process.env.API_URL as string;

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    authUser:User|undefined;
    setAuthUser:(value: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

import React from "react";
import {User} from "../types";
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authUser, setAuthUser] = useState<User|undefined>();

    useEffect(() => {
        const checkAuth = async () => {
            const loggedUser:User = JSON.parse(localStorage.getItem("userData") as string);
            try {
                await axios.get( `${API_URL}/auth/me`, { withCredentials: true,
                headers:{
                    "Authorization":`Bearer ${loggedUser?.token}`
                }
                });
                setAuthUser(loggedUser);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,authUser,setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
