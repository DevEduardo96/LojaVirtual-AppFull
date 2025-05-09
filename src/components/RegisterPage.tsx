import React, { useState } from "react";
import "../components/css/RegisterPage.css";

// Função de validação
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
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = { email: "", password: "", confirmPassword: "" };

    // Validação
    if (!validateEmail(form.email)) {
      newErrors.email = "Por favor, insira um e-mail válido.";
      formIsValid = false;
    }

    if (!validatePassword(form.password)) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
      formIsValid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) return;

    // Enviar dados para o Strapi
    try {
      const response = await fetch(
        "https://backend-app-vs0e.onrender.com/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.email, // ou outro campo se quiser um username diferente
            email: form.email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Cadastro bem-sucedido!");
        console.log("Token JWT:", data.jwt);
        // Você pode armazenar o JWT aqui se quiser autenticação contínua
        // localStorage.setItem("token", data.jwt);
      } else {
        alert(data.error?.message || "Erro ao registrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="container">
      {/* Texto de políticas de privacidade */}
      <div className="privacy-text">
        <p>
          Ao se registrar, você concorda com nossa{" "}
          <a
            href="https://www.seusite.com/politica-de-privacidade"
            target="_blank"
            rel="noopener noreferrer"
          >
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
