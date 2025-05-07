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
import ProductCatalog from "../components/ProductCatalog";
import CategoryCatalog from "../components/CategoryCatalog";

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
        <CategoryCatalog />
      </IonHeader>
      <IonContent fullscreen>
<<<<<<< HEAD
        <ProductCatalog />
=======
        <ProductCatalog
          addToCart={function (product: {
            id: number;
            Nome: string;
            Preco: number;
            Imagem: {
              url: string;
              formats?: { thumbnail?: { url: string } };
            }[];
          }): void {
            throw new Error("Function not implemented.");
          }}
        />
>>>>>>> 9037be7 (Integrações ao Carrinho)
      </IonContent>
    </IonPage>
  );
};

export default Products;
