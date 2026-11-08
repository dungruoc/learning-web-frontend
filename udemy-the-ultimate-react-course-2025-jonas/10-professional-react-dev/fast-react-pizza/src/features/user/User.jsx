import { useSelector } from "react-redux";

function User() {
    const user = useSelector(st => st.user);

    if (!user.userName)
        return null;

    return (
        <div className="text-sm font-semibold hidden md:block">{user.userName}</div>
    );
}

export default User;