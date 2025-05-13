import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";
import "./css/ListaProdutos.css";

type ProdutoSupabase = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

const ListaProdutos: React.FC = () => {
  const [products, setProducts] = useState<ProdutoSupabase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      const cached = localStorage.getItem("produtosCache");

      if (!navigator.onLine && cached) {
        console.warn("Sem internet. Carregando produtos do cache.");
        setProducts(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("ativo", true);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
        if (cached) {
          console.warn("Erro na API. Carregando produtos do cache.");
          setProducts(JSON.parse(cached));
        }
      } else if (data) {
        setProducts(data);
        localStorage.setItem("produtosCache", JSON.stringify(data));
      }

      setLoading(false);
    };

    fetchProdutos();
  }, []);

  const favoritarProduto = (produtoId: number) => {
    alert("Favoritos ainda não implementados no Supabase.");
  };

  return (
    <div className="catalogo-simple">
      {alertMessage && (
        <div className="alert-overlay" onClick={() => setAlertMessage(null)}>
          <div className="alert-box">{alertMessage}</div>
        </div>
      )}

      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card-simple skeleton-card">
              <div className="card-header">
                <span className="skeleton-text-line width-40"></span>
              </div>
              <div className="skeleton-image skeleton-effect-blink"></div>
              <div className="skeleton-text-line"></div>
              <div className="skeleton-text-line width-60"></div>
              <div className="skeleton-text-line width-30"></div>
              <div className="skeleton-button skeleton-effect-blink"></div>
            </div>
          ))
        : products.map((product) => {
            const isFavorited = favoritedIds.includes(product.id);
            const imageUrl = product.imagem?.startsWith("http")
              ? product.imagem
              : "https://via.placeholder.com/150?text=Sem+Imagem";

            return (
              <div key={product.id} className="card-simple">
                <div className="card-header">
                  <span className="discount">-10%</span>
                  <span
                    className={`heart ${isFavorited ? "active" : ""}`}
                    onClick={() => favoritarProduto(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    ♥
                  </span>
                </div>

                <img
                  src={imageUrl}
                  alt={product.nome}
                  className="product-image"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/150?text=Imagem+Indisponível")
                  }
                />

                <div className="product-title">{product.nome}</div>

                <div className="product-footer">
                  <span className="price">R$ {product.preco.toFixed(2)}</span>
                  <span className="rating">4.5 ⭐</span>
                </div>

                <div className="product-buttons">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        Nome: product.nome,
                        Preco: product.preco,
                        Imagem: [{ url: product.imagem }],
                      });
                      setAlertMessage(
                        `${product.nome} adicionado ao carrinho!`
                      );
                    }}
                  >
                    Adicionar
                  </button>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => {
                      window.location.href = `/produto/${product.id}`;
                    }}
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default ListaProdutos;
