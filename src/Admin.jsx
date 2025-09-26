import { useState } from "react";
import Aluno from './components/Aluno.jsx';
import SidebarAdmin from './components/SidebarAdmin.jsx';
import HeaderAdmin from './components/HeaderAdmin.jsx';


function Admin() {
  const [userData, setUserData] = useState({
    Usuario_Email: "",
    Usuario_Senha: "",
    Usuario_Cargo: ""
  });

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
      {/* Sidebar fixo à esquerda */}
      <SidebarAdmin
        onLogout={handleLogout}
        onUpdate={handleUpdate}
        userData={userData}
        setUserData={setUserData}
      />

      {/* Conteúdo principal */}
      <div className="mainAdmin">
        <HeaderAdmin />
        <Aluno />
      </div>
    </div>
  );
}

export default Admin;
