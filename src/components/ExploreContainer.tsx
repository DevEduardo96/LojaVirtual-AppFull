// ExploreContainer.tsx
import "./ExploreContainer.css";

interface CartProps {
  onCartClick: () => void;
}

const Cart: React.FC<CartProps> = ({ onCartClick }) => {
  return (
    <div className="top-nav">
      <div className="logo">
        <h1>ARTFIX</h1>
      </div>
      <a
        href="#"
        className="btn-cart"
        data-count="3"
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
