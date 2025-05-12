// src/components/Notificacoes.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criado_em: string;
}

const Notificacoes: React.FC = () => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotificacoes = async () => {
    const user = (await supabase.auth.getUser()).data.user;

    if (!user) {
      console.warn("Usuário não autenticado.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("notificacoes")
      .select("*")
      .eq("usuario_id", user.id)
      .order("criado_em", { ascending: false });

    if (error) {
      console.error("Erro ao buscar notificações:", error.message);
    } else {
      setNotificacoes(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  return (
    <div>
      <h2>Suas Notificações</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : notificacoes.length === 0 ? (
        <p>Você não possui notificações.</p>
      ) : (
        <ul>
          {notificacoes.map((notif) => (
            <li key={notif.id}>
              <strong>{notif.titulo}</strong>
              <p>{notif.mensagem}</p>
              <small>{new Date(notif.criado_em).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notificacoes;
