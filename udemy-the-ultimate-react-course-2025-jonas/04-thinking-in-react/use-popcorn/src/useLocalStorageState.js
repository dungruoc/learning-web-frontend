import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, stKey) {
    const [stateValue, setStateValue] = useState(() => {
        const data = localStorage.getItem(stKey);
        return data ? JSON.parse(data) : initialState;
    });

    useEffect(() => {
        const data = JSON.stringify(stateValue);
        localStorage.setItem(stKey, data);
    }, [stateValue, stKey]);
    
    return [stateValue, setStateValue];
}