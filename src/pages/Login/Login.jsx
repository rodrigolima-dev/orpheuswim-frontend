import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiConnect";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login(username, password)

            //Salvando token
            localStorage.setItem("token", data.token);

            //Redirecionar para página protegida
            navigate("/admin")
        } catch (err) {
            alert("Usuário ou senha inválidos")
        }
    }

    return (
        <div style={{ padding: 32 }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
}