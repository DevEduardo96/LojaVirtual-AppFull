import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSpinner,
  IonIcon,
  IonSearchbar,
} from "@ionic/react";
import { star } from "ionicons/icons";
import { supabase } from "../services/supabaseClient";
import { useCart } from "../context/CartContext";
import "./css/Detalhes-produtos.css";

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  imagem: string;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [product, setProduct] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<"desc" | "reviews">("desc");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError("Produto não encontrado.");
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>Carregando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="product-details-container">
            <div className="skeleton-image" />
            <div className="thumbnail-row">
              {[...Array(4)].map((_, i) => (
                <div className="skeleton-thumbnail" key={i} />
              ))}
            </div>

            <div className="size-rating-row">
              <div className="skeleton-size" />
              <div className="skeleton-rating" />
            </div>

            <div className="skeleton-title" />
            <div className="skeleton-price" />
            <div className="tab-buttons">
              <div className="skeleton-tab" />
              <div className="skeleton-tab" />
            </div>
            <div className="skeleton-description" />
            <div className="skeleton-buy-button" />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={"dark"}>
          <IonTitle>Detalhes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="product-details-container">
          <div className="image-carousel">
            <img
              src={product.imagem}
              alt={product.nome}
              onError={(e) =>
                (e.currentTarget.src = "https://via.placeholder.com/300")
              }
            />
            <div className="thumbnail-row">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={product.imagem}
                  alt={`Miniatura ${i}`}
                  className="thumbnail"
                />
              ))}
            </div>
          </div>

          <div className="size-rating-row">
            <div className="sizes">
              {[37, 38, 39, 40, 41].map((size) => (
                <button key={size} className="size-button">
                  {size}
                </button>
              ))}
            </div>
            <div className="rating">
              <IonIcon icon={star} color="warning" />
              <span>4.8</span>
            </div>
          </div>

          <div className="product-title">
            <h2>{product.nome}</h2>
            <p className="price">${product.preco}</p>
          </div>

          <div className="tab-buttons">
            <button
              className={selectedTab === "desc" ? "active" : ""}
              onClick={() => setSelectedTab("desc")}
            >
              Description
            </button>
            <button
              className={selectedTab === "reviews" ? "active" : ""}
              onClick={() => setSelectedTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {selectedTab === "desc" ? (
            <p className="descricao">{product.descricao}</p>
          ) : (
            <p className="descricao">No reviews available.</p>
          )}

          <IonButton
            expand="block"
            color="dark"
            className="buy-button"
            onClick={() => {
              addToCart({
                id: product.id,
                Nome: product.nome,
                Preco: product.preco,
              });
              history.push("/cart");
            }}
          >
            Buy Now
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetails;
