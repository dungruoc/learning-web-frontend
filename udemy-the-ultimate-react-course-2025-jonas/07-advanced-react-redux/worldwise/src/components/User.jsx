import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

export default function User() {
    const {user, logout} = useAuth();

    function handleClick() {
        logout();
    }

    return (
        <div className={styles.user}>
        <img src={user.avatar} alt={user.name} />
        <span>Welcome, {user.name}</span>
        <button onClick={handleClick}>Logout</button>
        </div>
    );
}