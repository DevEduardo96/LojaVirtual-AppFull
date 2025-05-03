import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import Slider from "../components/Slider";
import CategoryCatalog from "../components/CategoryCatalog";
import Catalog from "../components/Catalog";
import CatalogPrimary from "../components/CatalogPrimary";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>

        <IonToolbar className="ion-toolbar">
          <IonTitle className="titulo">
            <Cart></Cart>
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-1">
          <Slider />
          {/* Silder*/}
          <h2 className="categoriaspro">categorias de produtos</h2>
        </div>
        <CategoryCatalog />
        <CatalogPrimary />
      </IonContent>
    </IonPage>
  );
};

export default Home;
