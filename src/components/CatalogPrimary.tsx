import React from "react";
import "./css/CatalogPrimary.css";
import products from "./script/CatalogPrimary";

const CatalogPrimary: React.FC = () => {
  return (
    <div className="catalog-simple">
      {products.map((product) => (
        <div key={product.id} className="card-simple">
          <div className="card-header">
            <span className="discount">{product.discount}</span>
            <span className={`heart ${product.favorited ? "active" : ""}`}>
              ♥
            </span>
          </div>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="product-title">{product.title}</div>
          <div className="product-footer">
            <span className="price">{product.price}$</span>
            <span className="rating">{product.rating} ⭐</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CatalogPrimary;
