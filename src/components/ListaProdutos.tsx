import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import "./css/ListaProdutos.css";

type Produto = {
  id: number; // corrigido: tipo numérico (padrão Supabase)
  nome: string;
  preco: number;
  imagem: string; // URL direta da imagem
};

type Props = {
  addToCart: (produto: Produto) => void;
};

const CatalogPrimary: React.FC<Props> = ({ addToCart }) => {
  const [products, setProducts] = useState<Produto[]>([]);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("ativo", true);

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else if (data) {
        setProducts(data);
      }
    };

    fetchProdutos();
  }, []);

  const favoritarProduto = (produtoId: number) => {
    alert("Favoritos ainda não implementados no Supabase.");
    // Aqui futuramente você pode usar Supabase Auth + tabela favoritos
  };

  return (
    <div className="c-simple">
      {alertMessage && (
        <div className="alert-overlay" onClick={() => setAlertMessage(null)}>
          <div className="alert-box">{alertMessage}</div>
        </div>
      )}
      {products.map((product) => {
        const isFavorited = favoritedIds.includes(product.id);

        return (
          <div key={product.id} className="cd-simple">
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
              src={product.imagem}
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
