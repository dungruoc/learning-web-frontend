import { useState } from "react";

import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const {login, isLoggedIn} = useAuth();
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        login(email, password);
    }

    useEffect(() => {
        if (isLoggedIn)
            navigate('/app');
    }, [isLoggedIn, navigate]);


    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                
                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                </div>
                
                <div>
                    <button>Login</button>
                </div>
            </form>
        </main>
    );
}