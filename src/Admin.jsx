import { useState } from "react";
<<<<<<< Updated upstream
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
=======
import api from "./api.js";
import Aluno from "./components/Aluno.jsx";
import Grupo from "./components/grupo.jsx";
import Alimentos from "./components/alimentos.jsx";
import Dinheiro from "./components/dinheiro.jsx";
import Campanhas from "./components/campanhas.jsx";
import Usuarios from "./components/usuarios.jsx";
import PainelSuporte from "./Suporte.jsx";
import SidebarAdmin from "./components/SidebarAdmin.jsx";

import CadastroUsuario from "./components/cadastroUsuario.jsx";
import CadastroCampanha from "./components/cadastroCampanha.jsx";
import CadastroGrupo from "./components/CadastroGrupo.jsx";
import CadastroAlimento from "./components/CadastroAlimento.jsx";
import Relatorios from "./components/Relatorios.jsx";
>>>>>>> Stashed changes

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
      const response = await fetch(
        `http://localhost:500/api/users/usuario/${ID_Usuario}`,
        {
          method: "PUT",
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
<<<<<<< Updated upstream
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
=======
        onSelectPage={(page) => setActiveScreen(page)}
      
      />
      <div className="mainAdmin">
      
       
        {/* renderiza a tela conforme activeScreen */}
        {/* {activeScreen === "home" && <h2>Bem-vindo ao painel22222222</h2>} */}
        {activeScreen === "aluno" && (
          <Aluno onSelectPage={(page) => setActiveScreen(page)} />
        )}
        {activeScreen === "relatorios" && (<Relatorios onSelectPage={(page) => setActiveScreen(page)} />)}
        {activeScreen === "grupos" && (
          <Grupo onSelectPage={(page) => setActiveScreen(page)} />
        )}
        {activeScreen === "alimentos" && (
          <Alimentos onSelectPage={(page) => setActiveScreen(page)} />
        )}
>>>>>>> Stashed changes
        {activeScreen === "dinheiro" && <Dinheiro />}
        {activeScreen === "campanhas" && <Campanhas />}
        {activeScreen === "usuarios" && (<Usuarios onSelectPage={(page) => setActiveScreen(page)} />)}
        {activeScreen === "CadastroUsuario" && <CadastroUsuario />}
       
        {activeScreen === "suporte" && <PainelSuporte />}
        
      </div>
    </div>
  );
}

export default Admin;
