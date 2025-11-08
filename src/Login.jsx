import { useState } from 'react';
import './index.css'; 
import { useNavigate } from "react-router-dom";
import api from "./api.js"

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", { email, senha });
      const { msg, token, verificado, tipo, ID, error } = res.data;

      if (error) {
        alert(error);
        return;
      }

      localStorage.setItem("Tipo_Usuario", tipo);
     
      localStorage.setItem("token", token);
      localStorage.setItem("Email", email);
      localStorage.setItem("ID_Usuario", ID);

      alert(msg);

      console.log("Tipo:", tipo);
      console.log("ID:", ID);

      if (verificado != 1) {
        navigate(`/enviaremail/${token}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Erro no login:", err.response?.data || err.message);
      alert("Erro no login: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="bodyImg">
      <div className="divLogin">
        <aside className="asideLogin">
          <img className="logo" src="./public/logo.png" alt="Logo" />

          <p className="lbl_Bemvindo">
            Seja bem-vindo ao
            <br />
            Lideranças Empáticas
          </p>

          <p>
            Não tem uma conta? <a href="/forms">Cadastre-se</a>
          </p>

          <form className="login" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="inputLogin"
                type="email"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                className="inputLogin"
                type="password"
                placeholder="Senha"
                required
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button type="submit" className="botaoLogin">
              Login
            </button>
          </form>

          <a href="/esquecer-senha">Esqueci minha senha</a>
          <p className="footerLogin">&copy; 2025, 404 not found</p>
        </aside>
      </div>
    </div>
  );
}
export default Login;
