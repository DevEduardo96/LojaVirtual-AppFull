import "./ExploreContainer.css";

const Cart = () => {
  return (
    <div className="top-nav">
      <div className="logo">
        <h1>ARTFIX</h1>
      </div>
      <a href="#" className="btn-cart" data-count="3">
        <i className="ri-shopping-bag-4-line"></i>
      </a>
    </div>
  );
};
export default Cart;
