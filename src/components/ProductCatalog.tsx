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

<<<<<<< HEAD
const CatalogPrimary: React.FC = () => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const token = localStorage.getItem("jwt");
=======
type ProductsProps = {
  addToCart: (product: Produto) => void;
};

const Products: React.FC<ProductsProps> = ({ addToCart }) => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
>>>>>>> 9037be7 (Integrações ao Carrinho)

  const fetchProducts = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/produtos?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=6`
      );
      const json = await res.json();
      setProducts((prev) => [...prev, ...json.data]);
<<<<<<< HEAD
      setError(null);
    } catch (err) {
      setError("Erro ao buscar produtos. Tente novamente mais tarde.");
=======
    } catch (err) {
>>>>>>> 9037be7 (Integrações ao Carrinho)
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

<<<<<<< HEAD
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

      // Exibe o alerta de "Adicionado aos Favoritos"
      alert("Adicionado aos Favoritos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="catalog-simple">
      {loading && <div>Carregando...</div>}
      {error && <div>{error}</div>}
=======
  return (
    <div className="catalog-simple">
      {loading && <div>Carregando...</div>}
>>>>>>> 9037be7 (Integrações ao Carrinho)
      {products.map((product) => {
        const imagem = product.Imagem?.[0];
        const imageUrl =
          API_URL + (imagem?.formats?.thumbnail?.url || imagem?.url);
<<<<<<< HEAD
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
=======

        return (
          <div key={product.id} className="card-simple">
>>>>>>> 9037be7 (Integrações ao Carrinho)
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
              onClick={() => addToCart(product)}
            >
              Adicionar ao Carrinho
            </button>
>>>>>>> 9037be7 (Integrações ao Carrinho)
          </div>
        );
      })}
      <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
        {loading ? "Carregando..." : "Carregar Mais"}
      </button>
    </div>
  );
};

<<<<<<< HEAD
export default CatalogPrimary;
=======
export default Products;
>>>>>>> 9037be7 (Integrações ao Carrinho)
