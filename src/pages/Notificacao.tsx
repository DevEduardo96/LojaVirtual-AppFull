import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useCart } from "../context/CartContext";
import "./css/Home.css";
import Cart from "../components/ExploreContainer";
import NotificationCenter from "../components/NotificationCenter";

import { supabase } from "../services/supabaseClient";

interface HomeProps {
  onCartClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onCartClick }) => {
  useCart();

  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Erro ao obter sessão:", error.message);
      } else {
        console.log("Sessão atual:", session); // Debug
        const uid = session?.user?.id || null;
        setUserId(uid);
      }
      setLoading(false);
    };

    fetchUserId();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Mudança de autenticação:", session); // Debug
        const uid = session?.user?.id || null;
        setUserId(uid);
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="barra-superior">
          <h1 className="txbarra-superior"></h1>
        </IonToolbar>

        <IonToolbar className="ion-toolbar">
          <IonTitle className="titulo">
            <Cart onCartClick={onCartClick} />
            <h2 className="categoriaspro">Notificações</h2>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <p>Carregando notificações...</p>
        ) : userId ? (
          <NotificationCenter userId={userId} />
        ) : (
          <p>Você não está autenticado.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
