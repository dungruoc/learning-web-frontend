import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (!searchQuery)
            return;
        navigate(`/order/${searchQuery}`);
        setSearchQuery("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Search order #"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-yellow-100 w-28 rounded-full px-4 py-2 text-sm placeholder:text-stone-400
                sm:w-64 focus:w-32 sm:focus:w-72 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50
                transition-all duration-300"
            />
        </form>
    )
}

export default SearchOrder;