import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./css/Home.css";

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior">barra superior</h1>
        </IonToolbar>
        <IonToolbar>
          <IonTitle className="top-nav">
            <h1>Usuário</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="p-4">
          <h2 className="text-xl font-bold">Seu Perfil</h2>
          <h3>eduardoaraujo_96@outlook.com</h3>
          {/* Add profile content here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
