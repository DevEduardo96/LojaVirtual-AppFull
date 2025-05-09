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
      {/* Ícone do usuário */}
      <a href="#" className="btn-user">
        <i className="ri-heart-3-line"></i>
      </a>

      {/* Ícone do carrinho */}
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
