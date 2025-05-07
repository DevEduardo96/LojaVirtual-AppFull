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
import CategoryCatalog from "../components/CategoryCatalog";
import CatalogPrimary from "../components/CatalogPrimary";
import ListaProdutos from "../components/ListaProdutos";

interface HomeProps {
  onCartClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onCartClick }) => {
  const { addToCart } = useCart();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>

        <IonToolbar className="ion-toolbar">
          <IonTitle className="titulo">
            <Cart onCartClick={onCartClick} />
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <CategoryCatalog />
        <ListaProdutos addToCart={addToCart} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
