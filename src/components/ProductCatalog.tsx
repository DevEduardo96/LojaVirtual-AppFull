import React, { useEffect, useState } from "react";
import "./css/CatalogPrimary.css";

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

type ProductsProps = {
  addToCart: (product: Produto) => void;
};

const CatalogPrimary: React.FC<ProductsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const token = localStorage.getItem("jwt");

  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/produtos?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=6`
      );
      const json = await res.json();
      setProducts((prev) => [...prev, ...json.data]);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar produtos. Tente novamente mais tarde.");
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

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

      setFavoritedIds((prev) =>
        prev.includes(produtoId)
          ? prev.filter((id) => id !== produtoId)
          : [...prev, produtoId]
      );

      alert("Adicionado aos Favoritos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="catalog-simple">
      {loading && <div>Carregando...</div>}
      {error && <div>{error}</div>}

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

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        );
      })}

      <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
        {loading ? "Carregando..." : "Carregar Mais"}
      </button>
    </div>
  );
};

export default CatalogPrimary;
