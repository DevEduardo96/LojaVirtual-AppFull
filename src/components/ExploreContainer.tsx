import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import "./ExploreContainer.css";

interface CartProps {
  onCartClick: () => void;
}

const Cart: React.FC<CartProps> = ({ onCartClick }) => {
  const { cartItems } = useCart();
  const cartRef = useRef<HTMLAnchorElement>(null);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // Atualiza dinamicamente o atributo data-count com JS
  useEffect(() => {
    if (cartRef.current) {
      cartRef.current.setAttribute("data-count", String(totalQuantity));
    }
  }, [totalQuantity]);

  return (
    <div className="top-nav">
      <div className="logo">
        <img src="/logonew.png" alt="logo" />
      </div>
      <a
        href="#"
        className="btn-cart"
        ref={cartRef}
        onClick={(e) => {
          e.preventDefault();
          onCartClick();
        }}
      >
        <i className="ri-shopping-bag-4-line"></i>
      </a>
    </div>
  );
};

export default Cart;
