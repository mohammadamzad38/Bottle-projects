import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLs, getStoredCart, removeFromLs } from "../utilities/localstorage";
import Cart from "../cart/Cart";
import PropTypes from "prop-types";


const Bottles = () => {

    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    }, [])

    useEffect(() =>{
        if(bottles.length > 0){
            const storedCart = getStoredCart();
            const saveCart = [];

            for(const id of storedCart){
                const bottle = bottles.find(bottle => bottle.id === id);
                if(bottle){
                    saveCart.push(bottle)
                }
            }
            setCart(saveCart)
        }
    }, [bottles]);

    const handleAddToCart = bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLs(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id);
        setCart(remainingCart)
         removeFromLs(id);
    }

    return (
        <div>
            <h2>Availabe Bottles: {bottles.length} </h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>

            <div className="bottels-container">
            {
                bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;

