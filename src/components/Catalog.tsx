import React from "react";
import "./css/Catalog.css";
import products from "./script/products";

const Catalog: React.FC = () => {
  return (
    <div className="catalog">
      {products.map((product) => (
        <div key={product.id} className="card">
          {product.badge && (
            <span className={`badge ${product.badgeType}`}>
              {product.badge}
            </span>
          )}
          <img
            src={product.image}
            alt={product.title}
            className="product-img"
          />
          <h3>{product.title}</h3>
          <div className="price">
            <span className="current-price">${product.price}</span>
            <span className="old-price">${product.oldPrice}</span>
          </div>
          <div className="stars">⭐⭐⭐⭐⭐</div>
          <button className="add-btn">+</button>
        </div>
      ))}
    </div>
  );
};

export default Catalog;
