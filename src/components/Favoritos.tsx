import React from "react";
import "./css/Favoritos.css";

type Produto = {
  id: number;
  Nome: string;
  Preco: number;
  Imagem: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  }[];
};

interface FavoritosProps {
  produtosFavoritos: Produto[];
}

const Favoritos: React.FC<FavoritosProps> = ({ produtosFavoritos }) => {
  return (
    <div className="favoritos">
      <h2>Produtos Favoritos</h2>
      <div className="favoritos-list">
        {produtosFavoritos.map((product) => {
          const imagem = product.Imagem?.[0];
          const imageUrl =
            "http://localhost:1337" +
            (imagem?.formats?.thumbnail?.url || imagem?.url);

          return (
            <div key={product.id} className="favoritos-item">
              <img
                src={imageUrl}
                alt={product.Nome}
                className="product-image"
              />
              <div className="product-info">
                <div className="product-title">{product.Nome}</div>
                <div className="product-footer">
                  <span className="price">R$ {product.Preco.toFixed(2)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favoritos;
