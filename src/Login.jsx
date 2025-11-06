import { useState } from 'react';
import './index.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const[email, setEmail] = useState("")
  const[senha, setSenha] = useState("")

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "http://localhost:500/api/users/login", 
        {email, senha}
      )
      const {token, verificado} = res.data
      console.log("Resposta recebida", res)

      console.log("Resposta do backend:", res.data);
      alert(res.data.msg);
      localStorage.setItem("alunoEmail", email)

      if (res.data.ID_Aluno) {
        localStorage.setItem("ID_Aluno", res.data.ID_Aluno);
        console.log("ID salvo no localStorage:", res.data.ID_Aluno);
      } 
      
      if(verificado != 1){
        navigate(`/enviaremail/${token}`);
      }else{
        navigate("/")
      }
    } catch (err) {
      console.error("Erro no login:", err.response?.data || err.message);
      alert("Erro no login: " + (err.response?.data?.error || err.message));
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };      

  
  return (
    <div className="bodyImg"> 
      <div className="divLogin">
        <aside className="asideLogin">
          <img className="logo" src="logo.png" alt="Logo" />

          <p className="lbl_Bemvindo">
            Seja bem-vindo ao
            <br />
            Lideranças Empáticas
          </p>

    <p>Não tem uma conta? <a href="/forms">Cadastre-se</a></p>
    
          <form className="login" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                name="Email"                
                className="inputLogin"
                type="email"
                placeholder="Email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <input
                name="Senha"   
                className="inputLogin"
                type="password"
                placeholder="Senha"
                id="senha"                          
                required
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <button type="submit" className="botaoLogin">Login</button>
          </form>

          <a href="/esquecer-senha">Esqueci minha senha</a>
          <p className="footerLogin">&copy; 2025, 404 not found</p>
        </aside>
      </div>
    </div>
  );
}

export default Login;
