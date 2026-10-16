import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error('CitiesContext is used outside of provider');
    return context;
}

export function useRedirectNonAuth(path='/') {
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate(path);
    }, [isLoggedIn, navigate, path]);
}