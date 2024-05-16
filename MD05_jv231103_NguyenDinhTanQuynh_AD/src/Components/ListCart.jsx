import React, { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { formatMoney } from "../common";

export default function ListCart({ handleCloseCart }) {
    const { cart, loadData } = useCart();
    const [carts, setCarts] = useState(cart);

    const totalPrice = carts.reduce((previousValue, currentValue) => {
        const price = parseFloat(currentValue.price);
        return previousValue + price * currentValue.quantity;
    }, 0);

    const checkProductIndex = (id, array) => {
        return array.findIndex((item) => item.id === id);
    };

    const saveCartLocal = (array) => {
        localStorage.setItem("carts", JSON.stringify(array));
    };

    const handleSaveData = (newArray) => {
        saveCartLocal(newArray);
        setCarts(newArray);
        loadData(newArray);
    };

    const handleIncrease = (id) => {
        const productIndex = checkProductIndex(id, carts);
        const updatedCart = [...carts];
        updatedCart[productIndex].quantity += 1;
        handleSaveData(updatedCart);
    };

    const handleDecrease = (id) => {
        const productIndex = checkProductIndex(id, carts);
        const updatedCart = [...carts];
        if (updatedCart[productIndex].quantity > 1) {
            updatedCart[productIndex].quantity -= 1;
            handleSaveData(updatedCart);
        } else {
            handleDelete(id);
        }
    };

    const handleDelete = (id) => {
        const updateCart = carts.filter((item) => item.id !== id);
        handleSaveData(updateCart);
    };

    useEffect(() => {
        setCarts(cart);
    }, [cart]);

    return (
        <div className="position-fixed end-0 bg-secondary p-1 d-flex flex-column" style={{ zIndex: 100, height: "calc(100vh - 90px)", width: "500px" }}>
            <h2 className="fw-500 p-3 text-white cart-item">Cart</h2>
            <div className="d-flex flex-column gap-3" style={{ maxHeight: "600px", overflowY: "auto" }}>
                {carts.length === 0 ? (

                    <h1 className="text-white text-center fw-500 p-3 text-white" style={{ height: "50px" }}>Chưa có sản phẩm trong giỏ hàng</h1>
                ) : (
                    carts.map((cart, id) => (
                        <div key={id} className="d-flex gap-3 align-items-center justify-content-between p-2">
                            <img
                                style={{ borderRadius: "50%", width: "40px", height: "40px", backgroundColor: "black" }}
                                src={cart.image}
                                alt=""
                            />
                            <div className="text-white">{cart.product_name}</div>
                            <div className="text-white">{formatMoney(cart.price)}</div>
                            <div>
                                <button
                                    onClick={() => handleIncrease(cart.id)}
                                    className="btn-count"
                                >
                                    +
                                </button>
                                <span className="quantity">{cart.quantity}</span>
                                <button
                                    onClick={() => handleDecrease(cart.id)}
                                    className="btn-count"
                                >
                                    -
                                </button>
                                <i className="fa-solid fa-trash i-hover" onClick={() => handleDelete(cart.id)}></i>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="position-absolute p-3" style={{ bottom: 0, width: "90%" }}>
                <div className="text-white d-flex justify-content-between align-items-center pt-2">
                    <div className="total text-black">
                        Total: {formatMoney(totalPrice)}
                    </div>
                    <button
                        onClick={handleCloseCart}
                        className="close-btn btn btn-danger"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
