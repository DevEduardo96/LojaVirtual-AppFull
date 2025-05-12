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
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import { home, cart, notifications, person } from "ionicons/icons";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./theme/variables.css";
import "./App.css";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Favorites from "./pages/Notificacao";
import Profile from "./pages/Profile";

import { CartProvider } from "./context/CartContext";
import CartModal from "./components/CartModal"; // ✅ Usando o componente correto

setupIonicReact();

const App: React.FC = () => {
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <IonApp>
      <CartProvider>
        <IonReactRouter>
          {/* ✅ CartModal corretamente referenciado */}
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
                path="/favorites"
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
                <IonLabel className="tab-label">Catálogos</IonLabel>
              </IonTabButton>

              <IonTabButton
                tab="favorites"
                href="/favorites"
                className="tab-button"
              >
                <IonIcon icon={notifications} />
                <div className="notification-badge"></div>
                <IonLabel className="tab-label">Notificações</IonLabel>
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
