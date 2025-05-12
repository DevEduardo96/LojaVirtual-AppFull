import React from "react";
import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import "./css/Home.css";
import RegisterPage from "../components/RegisterPage";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior"></h1>
        </IonToolbar>
        <IonToolbar>
          <div className="logo-user">
            <div className="logo">
              <img src="/logonew.png" alt="logo" />
            </div>
            <div className="localizacao">
              <i className="ri-map-pin-2-fill"></i>
              <span>Rua zero, 123 - Centro, Cidade </span>
            </div>
          </div>
          <h2 className="categoriaspro">faça o seu cadastro</h2>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-4">
          <RegisterPage />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
