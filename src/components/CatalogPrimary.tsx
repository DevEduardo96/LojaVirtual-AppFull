import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import "./css/CatalogoPrimary.css";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string; // URL direta armazenada no Supabase
};

type Props = {
  addToCart: (produto: Produto) => void;
};

const CatalogPrimary: React.FC<Props> = ({ addToCart }) => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("ativo", true);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProducts(data || []);
      }
    };

    fetchProdutos();
  }, []);

  const favoritarProduto = async (produtoId: number) => {
    if (!token) {
      setAlertMessage("Você precisa estar logado para favoritar.");
      return;
    }

    try {
      const { error } = await supabase.from("favoritos").insert({
        usuario_token: token,
        produto_id: produtoId,
      });

      if (error) throw error;

      setFavoritedIds((prev) => [...prev, produtoId]);
    } catch (err) {
      console.error("Erro ao favoritar:", err);
    }
  };

  return (
    <div className="catalog-simple">
      {alertMessage && (
        <div className="alert-overlay" onClick={() => setAlertMessage(null)}>
          <div className="alert-box">{alertMessage}</div>
        </div>
      )}

      {products.map((product) => {
        const isFavorited = favoritedIds.includes(product.id);
        const imageUrl = product.imagem?.startsWith("http")
          ? product.imagem
          : "https://via.placeholder.com/150?text=Sem+imagem";

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
            <img
              src={imageUrl}
              alt={product.nome}
              className="product-image"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/150?text=Imagem+indisponível")
              }
            />
            <div className="product-title">{product.nome}</div>
            <div className="product-footer">
              <span className="price">R$ {product.preco.toFixed(2)}</span>
              <span className="rating">4.5 ⭐</span>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => {
                addToCart({
                  id: product.id,
                  Nome: product.nome,
                  Preco: product.preco,
                  Imagem: [{ url: product.imagem }], // Adaptação ao antigo formato
                } as any); // usar "as any" para forçar o tipo, ou declare dois tipos diferentes
                setAlertMessage(`${product.nome} adicionado ao carrinho!`);
              }}
            >
              Adicionar
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default CatalogPrimary;
