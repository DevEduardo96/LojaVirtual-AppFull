import React from "react";
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
import { home, cart, heart, person } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/favorites" component={Favorites} />
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

          <IonTabButton tab="products" href="/products" className="tab-button">
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

          <IonTabButton tab="profile" href="/profile" className="tab-button">
            <IonIcon icon={person} />
            <IonLabel className="tab-label">Usuário</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
