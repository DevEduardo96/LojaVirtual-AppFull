import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

import { useCart } from "../context/CartContext"; // ajuste o caminho se necessário

import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import ListaProdutos from "../components/ListaProdutos";

interface ProductsProps {
  onCartClick: () => void;
}

const Products: React.FC<ProductsProps> = ({ onCartClick }) => {
  const { addToCart } = useCart();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior"></h1>
        </IonToolbar>

        <IonToolbar className="ion-toolbar">
          <IonTitle className="titulo">
            <Cart onCartClick={onCartClick} />
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ListaProdutos addToCart={addToCart} />
      </IonContent>
    </IonPage>
  );
};

export default Products;

// Esses Produtos estão sendo importados de ListaProdutos.tsx
