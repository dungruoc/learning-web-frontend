import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import User from "../features/user/User";

function Header() {
    return (
        <header className="bg-yellow-400 uppercase px-4 py-3 border-b
            border-stone-200 sm:px-6 flex items-center justify-between font-pizza">
            <Link to="/" className="tracking-widest">Fast React Pizza Co.</Link>
            <SearchOrder />
            <User />
        </header>
    )
}

export default Header;