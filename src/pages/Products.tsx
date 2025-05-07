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

type Produto = {
  id: number;
  Nome: string;
  Preco: number;
  Imagem: {
    url: string;
    formats?: { thumbnail?: { url: string } };
  }[];
};

type ProductsProps = {
  addToCart: (product: Produto) => void;
};

const Products: React.FC<ProductsProps> = ({ addToCart }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>
        <IonToolbar>
          <IonTitle className="titulos">
            <Cart />
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
        <CategoryCatalog />
      </IonHeader>
      <IonContent fullscreen>
        <ProductCatalog addToCart={addToCart} />
      </IonContent>
    </IonPage>
  );
};

export default Products;
