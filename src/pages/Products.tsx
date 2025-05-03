import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import Catalog from "../components/Catalog";

const Products: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>
        <IonToolbar>
          <IonTitle className="titulos">
            <Cart></Cart>
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Catalog />
      </IonContent>
    </IonPage>
  );
};

export default Products;
