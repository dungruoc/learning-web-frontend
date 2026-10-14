import { useContext } from "react";
import { createContext } from "react";

export const CitiesContext = createContext();

export function useCities() {
    const context = useContext(CitiesContext);
    if (!context)
        throw new Error('CitiesContext is used outside of provider');
    return context;
}
