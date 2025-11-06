import { useState } from "react";
import api from "./api.js"
import Aluno from './components/Aluno.jsx';
import Grupo from './components/grupo.jsx';
import Alimentos from './components/alimentos.jsx';
import Dinheiro from './components/dinheiro.jsx';
import Campanhas from './components/campanhas.jsx';
import Usuarios from './components/usuarios.jsx';
import PainelSuporte from './Dashboard.jsx';
import SidebarAdmin from './components/SidebarAdmin.jsx';
import HeaderAdmin from './components/HeaderAdmin.jsx';
import CadastroUsuario from './components/cadastroUsuario.jsx'

function Admin() {
  const [userData, setUserData] = useState({
    Usuario_Email: "",
    Usuario_Senha: "",
    Usuario_Cargo: ""
  });

  const [activeScreen, setActiveScreen] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("ID_Usuario");
    window.location.href = "/";
  };

  const handleUpdate = async () => {
    const ID_Usuario = localStorage.getItem("ID_Usuario");
    try {
      const response = await api.put(`/usuario/${ID_Usuario}`,
        {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        }
      );
      const data = await response.json();
      alert(data.msg || data.error);
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  return (
    <div className="bodyAdmin">
      
      <SidebarAdmin
        onLogout={handleLogout}
        onUpdate={handleUpdate}
        userData={userData}
        setUserData={setUserData}
        onSelectPage={(page) => setActiveScreen(page)} // <-- aqui
      />
      <div className="mainAdmin">
        
        <HeaderAdmin />

        {/* renderiza a tela conforme activeScreen */}
        {/* {activeScreen === "home" && <h2>Bem-vindo ao painel22222222</h2>} */}
        {activeScreen === "aluno" && <Aluno />}
        {/* {activeScreen === "relatorios" && <div>Relatórios (placeholder)</div>} */}
        {activeScreen === "grupos" && <Grupo />}
        {activeScreen === "alimentos" && <Alimentos />}
        {activeScreen === "dinheiro" && <Dinheiro />}
        {activeScreen === "campanhas" && <Campanhas />}
        {activeScreen === "usuarios" && (<Usuarios onSelectPage={(page) => setActiveScreen(page)} />)}
        {activeScreen === "CadastroUsuario" && <CadastroUsuario />}
        {/* {activeScreen === "administrativo" && <div>Administrativo (placeholder)</div>}   */}
        {activeScreen === "suporte" && <PainelSuporte />}
        
      </div>
    </div>
  );
}

export default Admin;
