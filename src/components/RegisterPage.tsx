import React, { useState } from "react";
import { supabase } from "../services/supabaseClient";
import "../components/css/RegisterPage.css"; // CSS permanece igual

const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password: string) => password.length >= 6;

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: "", password: "", confirmPassword: "" };

    if (!validateEmail(form.email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
      valid = false;
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) {
        console.error("Erro ao criar conta:", error.message);
        alert("Erro ao registrar: " + error.message); // Alerta padrão
        return;
      }

      const user = data.user;
      if (!user) {
        alert("Erro: Usuário não retornado."); // Alerta padrão
        return;
      }

      const { error: insertError } = await supabase.from("usuarios").insert([
        {
          user_id: user.id,
          nome: form.email,
          email: form.email,
        },
      ]);

      if (insertError) {
        console.error("Erro ao inserir no Supabase:", insertError.message);
        alert("Erro ao salvar usuário na tabela."); // Alerta padrão
      } else {
        alert("Usuário registrado com sucesso!"); // Alerta padrão
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Erro inesperado ao registrar."); // Alerta padrão
    }
  };

  return (
    <div className="container">
      <div className="privacy-text">
        <p>
          Ao se registrar, você concorda com nossa{" "}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a>
          .
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Registrar</h2>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleInputChange}
            className={errors.confirmPassword ? "error" : ""}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
