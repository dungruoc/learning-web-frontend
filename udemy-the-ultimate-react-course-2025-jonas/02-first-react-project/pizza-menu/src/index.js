import React from "react";
import ReactDOM from "react-dom/client";

import './index.css';
import {pizzaData as pizzas} from './data.js';

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
        <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    const hasPizza = pizzas && pizzas.length > 0;
    return (
        <div className="menu">
            <h2>Our Menu</h2>
            {hasPizza ? (
                <>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose from. All
                        from our stone oven, all organic, all delicious.
                    </p>
                    <ul className="pizzas">
                        {pizzas.map((pizza, idx) =>
                            <Pizza key={idx} pizzaData={pizza} />
                        )}
                    </ul>
                </>
            ) : (<p>We are working on our menu. Please come back later!</p>)}
        </div>
    );
}

function Pizza({pizzaData}) {
    // console.log(pizzaData);
    return (
        <li className={"pizza" + (pizzaData.soldOut ? " sold-out" : "")}>
            <img src={pizzaData.photoName} alt={pizzaData.name}/>
            <div>
                <h3>{pizzaData.name}</h3>
                <p>{pizzaData.ingredients}</p>
                <span>{pizzaData.soldOut ? "Sold out".toUpperCase() : pizzaData.price}</span>
            </div>
        </li>
    );
}


function Footer() {
    const hour = new Date().getHours();
    const openHour = 17;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour < closeHour;
    
    return (
        <footer className="footer">
            <p>
                {new Date().toLocaleTimeString()}.
            </p>
            {isOpen ?
                <Order closeHour={closeHour}/> : 
                <span>We're happy to welcome you between {openHour}:00 and {closeHour}:00</span>
            }
        </footer>
    );
}

function Order(props) {
    return (
        <div className="order">
            <p>
                We're open till {props.closeHour}:00. Come visit us or order online.
            </p>
            <button className="btn">
                Order
            </button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
);