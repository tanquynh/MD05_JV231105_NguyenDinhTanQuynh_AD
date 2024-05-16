import React, { useState } from "react";
import {  useCart } from "./CartProvider";
import ListCart from "./ListCart";

export default function Header() {
    const [showCart, setShowCart] = useState(false);// Lấy giỏ hàng từ CartContext
    const { cart } = useCart();
 // Đóng danh sách cart
    const handleCloseCart = () => {
        setShowCart(false);
    };

    return (
        <>
            <header
                style={{ zIndex: 101 }}
                className="d-flex position-sticky top-0 align-items-end justify-content-between p-4 bg-warning"
            >
                <div className="d-flex gap-3">
                    <div className="cursor-pointer text-white fw-semibold">
                        Trang chủ
                    </div>
                    <div className="cursor-pointer text-white fw-semibold">
                        Danh sách sản phẩm
                    </div>
                </div>
                <div
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowCart(!showCart)}
                >
                    <i className="fa-solid fa-cart-shopping position-relative fs-4">
                        <span
                            style={{ fontSize: 10 }}
                            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        >
                            {cart.length}
                        </span>
                    </i>
                </div>
            </header>
            {showCart && <ListCart handleCloseCart={handleCloseCart} />}
        </>
    );
}
