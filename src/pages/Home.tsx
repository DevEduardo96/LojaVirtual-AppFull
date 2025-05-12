import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
} from "@ionic/react";

import { useCart } from "../context/CartContext";

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
        {/* Top Bar */}
        <IonToolbar color="dark" className="barra-superior">
          <h1
            className="txbarra-superior"
            aria-label="Barra superior de navegação"
          ></h1>
        </IonToolbar>

        {/* Toolbar com Carrinho, Busca e Localização */}
        <IonToolbar className="ion-toolbar">
          <div className="header-content">
            <Cart onCartClick={onCartClick} />
            <IonSearchbar
              className="busca"
              placeholder="Digite sua busca..."
              animated
              debounce={300}
              aria-label="Campo de busca de produtos"
            />
            <div className="localizacao" aria-label="Localização atual">
              <i className="ri-map-pin-line" aria-hidden="true"></i>
              <span>Rua Fictícia, 123 - Centro, Cidade Exemplo</span>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <section className="p-1">
          <Slider />
          <h2 className="categoriaspro" aria-label="Título das categorias">
            Categorias de Produtos
          </h2>
        </section>

        <CategoryCatalog />
        <CatalogPrimary addToCart={addToCart} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
