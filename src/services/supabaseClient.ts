import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://uyaztjggrfuxtyyfwmnw.supabase.co", // 🔁 Substitua pela URL do seu projeto Supabase
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YXp0amdncmZ1eHR5eWZ3bW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MTQ0NjUsImV4cCI6MjA2MjM5MDQ2NX0.U56NrxSFHbQM_v5vUIwzHt_moPGk_KQ5HHxAZp0tzIM" // 🔁 Substitua pela sua chave pública (anon key)
);
