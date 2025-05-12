// hooks/useAuthUser.ts
import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const useAuthUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUserId(data?.user?.id || null);
      }
      setLoading(false);
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { userId, loading };
};
