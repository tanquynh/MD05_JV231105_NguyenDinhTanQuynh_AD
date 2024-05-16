import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
        // Lấy dữ liệu từ local làm giá trị khởi tạo
    const [cart, setCart] = useState(() => {
        const localCart = JSON.parse(localStorage.getItem("carts"));
        return Array.isArray(localCart) ? localCart : [];
    });

    useEffect(() => {
        localStorage.setItem("carts", JSON.stringify(cart));
    }, [cart]);
// Load Lại dữ liệu khi có bất kì sự thay đổi dưới các component con
    const loadData = (newCart) => {
        setCart(newCart);
    };

    const addToCart = (product) => {
        const productIndex = cart.findIndex((item) => item.id === product.id);
 // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm nó vào với số lượng là 1
        if (productIndex === -1) {
            const newCart = [...cart, { ...product, quantity: 1 }];
            setCart(newCart);
        } else {
         // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên 1
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity += 1;
            setCart(updatedCart);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, loadData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
