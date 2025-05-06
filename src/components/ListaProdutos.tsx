import React, { useEffect, useState } from "react";
import "./css/CatalogPrimary.css";

type DescricaoBlock = {
  type: string;
  children: { type: string; text: string }[];
};

type Produto = {
  id: number;
  attributes: {
    Nome: string;
    Preco: number;
    Descricao: DescricaoBlock[];
    Imagem: {
      data: {
        attributes: {
          url: string;
        };
      } | null;
    };
  };
};

const API_URL = "http://localhost:1337";

const ProductCatalog: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoritedIds, setFavoritedIds] = useState<number[]>([]);

  const token = localStorage.getItem("jwt");

  useEffect(() => {
    fetch(`${API_URL}/api/produtos?populate=Imagem`)
      .then((res) => res.json())
      .then((json) => {
        setProdutos(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setLoading(false);
      });
  }, []);

  const favoritarProduto = async (produtoId: number) => {
    if (!token) {
      alert("Você precisa estar logado para favoritar.");
      return;
    }

    try {
      // Verifica se o produto já está favoritado
      const isFavorited = favoritedIds.includes(produtoId);

      if (isFavorited) {
        // Se já estiver favoritado, remove do Strapi
        const res = await fetch(`${API_URL}/api/favoritos/${produtoId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Erro ao remover favorito");

        // Remove do estado local
        setFavoritedIds((prev) => prev.filter((id) => id !== produtoId));
      } else {
        // Se não estiver favoritado, adiciona ao Strapi
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

        // Atualiza o estado local
        setFavoritedIds((prev) => [...prev, produtoId]);
      }
    } catch (err) {
      console.error("Erro ao favoritar:", err);
    }
  };

  const renderDescricao = (descricao: DescricaoBlock[]) => {
    return descricao.map((block, i) => {
      if (block.type === "paragraph") {
        return (
          <p key={i}>
            {block.children.map((child, j) => (
              <span key={j}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Catálogo de Produtos</h1>
      {produtos.map((produto) => {
        const { Nome, Preco, Descricao, Imagem } = produto.attributes;
        const imagemUrl = Imagem?.data?.attributes?.url
          ? `${API_URL}${Imagem.data.attributes.url}`
          : null;

        const isFavorited = favoritedIds.includes(produto.id);

        return (
          <div
            key={produto.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              position: "relative",
            }}
          >
            <span
              onClick={() => favoritarProduto(produto.id)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: "24px",
                cursor: "pointer",
                color: isFavorited ? "red" : "#ccc",
              }}
              title={isFavorited ? "Remover dos favoritos" : "Favoritar"}
            >
              ♥
            </span>
            {imagemUrl && (
              <img
                src={imagemUrl}
                alt={Nome}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            )}
            <h2>{Nome}</h2>
            <p>
              <strong>Preço:</strong> R$ {Preco}
            </p>
            {renderDescricao(Descricao)}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCatalog;
