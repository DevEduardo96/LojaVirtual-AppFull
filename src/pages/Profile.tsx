import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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
          <div className="logo">
            <img src="/logonew.png" alt="logo" />
          </div>
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
