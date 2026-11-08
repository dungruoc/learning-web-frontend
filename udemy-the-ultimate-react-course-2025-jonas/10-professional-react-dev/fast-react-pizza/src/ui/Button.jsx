import { Link } from "react-router-dom";

function Button({children, disabled=false, to, type='primary', onClick}) {

    const baseStyles = "bg-yellow-400 text-sm inline-block uppercase tracking-wide text-stone-800 font-semibold rounded-full transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

    const styles = {
        primary: baseStyles + " px-4 py-3 sm:px-6 sm:py-4",
        small: baseStyles + " px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
        sround: baseStyles + " px-2.5 py-1 md:px-3.5 md:py-2 text-xs md:text-sm rounded-full",
        secondary: "inline-block text-sm border-2 border-stone-300 uppercase tracking-wide text-stone-400 font-semibold rounded-full transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:outline-none focus:bg-stone-300 focus:text-stone-800 focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3.5"
    }

    return (
        to ? <Link className={styles[type]} to={to}>{children}</Link> :
        <button disabled={disabled} className={styles[type]} onClick={onClick}>{children}</button>
    );
}

export default Button;