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
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <h1>Notificações apareceram aqui</h1>
      </IonContent>
    </IonPage>
  );
};

export default Home;
