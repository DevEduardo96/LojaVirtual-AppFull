import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

<<<<<<< HEAD
=======
import { useCart } from "../context/CartContext"; // ajuste o caminho conforme seu projeto

>>>>>>> 9037be7 (Integrações ao Carrinho)
import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import Slider from "../components/Slider";
import CategoryCatalog from "../components/CategoryCatalog";
import CatalogPrimary from "../components/CatalogPrimary";

const Home: React.FC = () => {
<<<<<<< HEAD
=======
  const { addToCart } = useCart(); // pega a função real do contexto

>>>>>>> 9037be7 (Integrações ao Carrinho)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>

        <IonToolbar className="ion-toolbar">
          <IonTitle className="titulo">
<<<<<<< HEAD
            <Cart></Cart>
=======
            <Cart />
>>>>>>> 9037be7 (Integrações ao Carrinho)
            <IonSearchbar className="busca" placeholder="Digite sua busca..." />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-1">
          <Slider />
<<<<<<< HEAD
          {/* Silder*/}
          <h2 className="categoriaspro">categorias de produtos</h2>
        </div>
        <CategoryCatalog />
        <CatalogPrimary />
=======
          <h2 className="categoriaspro">categorias de produtos</h2>
        </div>
        <CategoryCatalog />
        <CatalogPrimary addToCart={addToCart} />
>>>>>>> 9037be7 (Integrações ao Carrinho)
      </IonContent>
    </IonPage>
  );
};

export default Home;
