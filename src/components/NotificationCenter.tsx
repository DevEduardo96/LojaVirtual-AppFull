import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { IonList, IonItem, IonLabel, IonBadge, IonButton } from "@ionic/react";
import "./css/Notificacoes.css";

interface Notificacao {
  id: string;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criado_em: string;
}

const NotificationCenter: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  // Recupera o userId da sessão
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Erro ao obter sessão:", error.message);
        return;
      }

      const session = data.session;
      console.log("Sessão atual:", session);
      setUserId(session?.user?.id ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Mudança de autenticação:", session);
        setUserId(session?.user?.id ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Carrega e escuta notificações
  useEffect(() => {
    if (!userId) return;

    const fetchNotificacoes = async () => {
      const { data, error } = await supabase
        .from("notificacoes")
        .select("*")
        .eq("usuario_id", userId)
        .order("criado_em", { ascending: false });

      if (error) {
        console.error("Erro ao carregar notificações:", error.message);
      } else {
        console.log("Notificações carregadas:", data);
        setNotificacoes(data || []);
      }
    };

    fetchNotificacoes();

    const channel = supabase
      .channel("notificacoes_realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notificacoes",
          filter: `usuario_id=eq.${userId}`,
        },
        (payload) => {
          const nova = payload.new as Notificacao;
          setNotificacoes((prev) => [nova, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const marcarComoLida = async (id: string) => {
    await supabase.from("notificacoes").update({ lida: true }).eq("id", id);
    setNotificacoes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
    );
  };

  return (
    <IonList>
      {notificacoes.map((n) => (
        <IonItem key={n.id} color={n.lida ? "light" : "warning"}>
          <IonLabel>
            <h2>{n.titulo}</h2>
            <p>{n.mensagem}</p>
          </IonLabel>
          {!n.lida && <IonBadge color="danger">Nova</IonBadge>}
          <IonButton onClick={() => marcarComoLida(n.id)} size="small">
            Marcar como lida
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default NotificationCenter;
