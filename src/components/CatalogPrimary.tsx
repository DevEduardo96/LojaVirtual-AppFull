import React, { useEffect, useState } from "react";
import "./css/CatalogPrimary.css";
<<<<<<< HEAD

=======
>>>>>>> 9037be7 (Integrações ao Carrinho)
const API_URL = "http://localhost:1337";

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

<<<<<<< HEAD
const CatalogPrimary: React.FC = () => {
=======
type Props = {
  addToCart: (produto: Produto) => void; // Recebe a função addToCart como prop
};

const CatalogPrimary: React.FC<Props> = ({ addToCart }) => {
>>>>>>> 9037be7 (Integrações ao Carrinho)
  const [products, setProducts] = useState<Produto[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetch(
      `${API_URL}/api/produtos?populate=*&pagination[page]=1&pagination[pageSize]=2`
    )
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data);
      })
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  const favoritarProduto = async (produtoId: number) => {
    if (!token) {
      alert("Você precisa estar logado para favoritar.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/favoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            produto: produtoId,
          },
        }),
      });

      if (!res.ok) throw new Error("Erro ao favoritar");

      // Atualiza visualmente o estado
      setFavoritedIds((prev) => [...prev, produtoId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="catalog-simple">
      {products.map((product) => {
        const imagem = product.Imagem?.[0];
        const imageUrl =
          API_URL + (imagem?.formats?.thumbnail?.url || imagem?.url);
        const isFavorited = favoritedIds.includes(product.id);

        return (
          <div key={product.id} className="card-simple">
            <div className="card-header">
              <span className="discount">-10%</span>
              <span
                className={`heart ${isFavorited ? "favorited" : ""}`}
                onClick={() => favoritarProduto(product.id)}
                style={{ cursor: "pointer" }}
              >
                ♥
              </span>
            </div>
            <img src={imageUrl} alt={product.Nome} className="product-image" />
            <div className="product-title">{product.Nome}</div>
            <div className="product-footer">
              <span className="price">R$ {product.Preco.toFixed(2)}</span>
              <span className="rating">4.5 ⭐</span>
            </div>
<<<<<<< HEAD
            <button className="add-to-cart-btn">Adicionar</button>
=======
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)} // Chama addToCart ao clicar
            >
              Adicionar
            </button>
>>>>>>> 9037be7 (Integrações ao Carrinho)
          </div>
        );
      })}
    </div>
  );
};

export default CatalogPrimary;
