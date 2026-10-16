import { useAuth, useRedirectNonAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({children, path='/'}) {
    useRedirectNonAuth(path);
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? children : null;
}