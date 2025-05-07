import React, { useState } from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonModal,
  IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { home, cart, heart, person } from "ionicons/icons";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "./theme/variables.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import "./App.css";

import { CartProvider, useCart } from "./context/CartContext";

const API_URL = "http://localhost:1337";

type Produto = {
  id: number;
  Nome: string;
  Preco: number;
  Imagem: {
    url: string;
    formats?: {
      thumbnail?: {
        url: string;
      };
    };
  }[];
};

setupIonicReact();

const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { cartItems } = useCart();

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      breakpoints={[0, 0.4, 0.75]}
      initialBreakpoint={0.4}
      handleBehavior="cycle"
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>Carrinho de Compras</h1>
          </IonTitle>
          <IonButton className="btn-fechar" slot="end" onClick={onClose}>
            Fechar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <IonItem key={item.id}>
                <img
                  src={`${API_URL}${item.Imagem[0]?.url}`}
                  alt={item.Nome}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    marginRight: 10,
                    borderRadius: 8,
                  }}
                />
                <IonLabel>
                  <h2>{item.Nome}</h2>
                  <p>
                    R$ {item.Preco.toFixed(2)} x {item.quantidade}
                  </p>
                  <p>Total: R$ {(item.Preco * item.quantidade).toFixed(2)}</p>
                </IonLabel>
              </IonItem>
            ))
          ) : (
            <IonItem>
              <IonLabel>Seu carrinho está vazio.</IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

const App: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <IonApp>
      <CartProvider>
        <IonReactRouter>
          <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Route
                exact
                path="/home"
                render={() => <Home onCartClick={() => setCartOpen(true)} />}
              />
              <Route
                exact
                path="/products"
                render={() => (
                  <Products onCartClick={() => setCartOpen(true)} />
                )}
              />
              <Route
                exact
                path="/Favorites"
                render={() => (
                  <Favorites onCartClick={() => setCartOpen(true)} />
                )}
              />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className="ion-tab-bar">
              <IonTabButton tab="home" href="/home" className="tab-button">
                <IonIcon icon={home} />
                <IonLabel className="tab-label">Início</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="products"
                href="/products"
                className="tab-button"
              >
                <IonIcon icon={cart} />
                <IonLabel className="tab-label">Produtos</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="favorites"
                href="/favorites"
                className="tab-button"
              >
                <IonIcon icon={heart} />
                <IonLabel className="tab-label">Favoritos</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="profile"
                href="/profile"
                className="tab-button"
              >
                <IonIcon icon={person} />
                <IonLabel className="tab-label">Usuário</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </CartProvider>
    </IonApp>
  );
};

export default App;
