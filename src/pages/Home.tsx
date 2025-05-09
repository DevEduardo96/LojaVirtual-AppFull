import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

import { useCart } from "../context/CartContext"; // ajuste o caminho conforme seu projeto

import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import Slider from "../components/Slider";
import CategoryCatalog from "../components/CategoryCatalog";
import CatalogPrimary from "../components/CatalogPrimary";

interface HomeProps {
  onCartClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onCartClick }) => {
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
            <div className="localizacao">
              <i className="ri-map-pin-2-fill"></i>
              <span>Rua zero, 123 - Centro, Cidade </span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-1">
          <Slider />
          <h2 className="categoriaspro">categorias de produtos</h2>
        </div>
        <CategoryCatalog />
        <CatalogPrimary addToCart={addToCart} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
