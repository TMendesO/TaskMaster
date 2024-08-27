import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate para redirecionamento

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Instancia o hook useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = await login({ email, password });
      // Armazenar o token no localStorage
      localStorage.setItem("token", token);
      // Redirecionar o usuário após o login
      navigate("/dashboard"); // Redireciona para a página de dashboard ou outra página de sua escolha
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
