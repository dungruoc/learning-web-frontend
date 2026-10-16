import { useState } from "react";
import { AuthContext } from "./AuthContext";

const initState = {
    user: {},
    avatar: null,
    isLoggedIn: false
}

const FAKE_USERS = [
    {   
        name: 'Test1',
        email: "test1@example.com",
        string: 'test1',
        avatar: "https://i.pravatar.cc/100?u=zz",

    },
    {
        name: 'Test2',
        email: "test2@example.com",
        string: 'test2',
        avatar: "https://i.pravatar.cc/100?u=aa",
    }
]

export default function AuthProvider({children}) {
    const [state, setState] = useState(initState);

    function login(email, password) {
        const user = FAKE_USERS.find(u => u.email === email && u.string === password);
        if (user) {
            console.log(user);
            setState(st => ({...st, user: { name: user.name, email: user.email, avatar: user.avatar }, isLoggedIn: true}));
        }
    }

    function logout() {
        setState(initState);
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                ...state
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
