import { useState } from "react";

function SidebarAdmin({ onLogout, onUpdate, userData, setUserData }) {
  const [modalConfig, setModalConfig] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const handleDeleteAccount = async () => {
    const ID_Usuario = localStorage.getItem("ID_Usuario");
    if (!ID_Usuario) {
      alert("Usuário não identificado!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:500/api/users/usuario/${ID_Usuario}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      alert(data.msg || data.error);

      if (response.ok) {
        localStorage.removeItem("ID_Usuario");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
    }
  };

  const handleOpenEdit = async () => {
    const ID_Usuario = localStorage.getItem("ID_Usuario");
    if (!ID_Usuario) {
      alert("Usuário não identificado!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:500/api/users/usuario/${ID_Usuario}`
      );
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        setModalEdit(true);
      } else {
        alert(data.error || "Erro ao buscar usuário");
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      alert("Erro no servidor ao buscar usuário");
    }
  };

  return (
    <aside className="asideAdmin">
      <img className="logoAdmin" src="LogoFundoBranco.avif" alt="logo" />

      <button className="btnAdmin">
        <img className="icon" src="home.png" alt="home" /> Página inicial
      </button>
      <button className="btnAdmin">
        <img className="icon" src="report.png" alt="relatorio" /> Relatórios
      </button>
      <button className="btnAdmin">
        <img className="icon" src="verify.png" alt="cadastros" /> Cadastros
      </button>
      <button className="btnAdmin">
        <img className="icon" src="heart.png" alt="doacoes" /> Doações
      </button>
      <button className="btnAdmin">
        <img className="icon" src="restaurant.png" alt="alimentos" /> Alimentos
      </button>
      <button className="btnAdmin">
        <img className="icon" src="dollar.png" alt="dinheiro" /> Dinheiro
      </button>
      <button className="btnAdmin">
        <img className="icon" src="graduation.png" alt="usuarios" /> Usuários
      </button>
      <button className="btnAdmin">
        <img className="icon" src="administrator.png" alt="administrativo" /> Administrativo
      </button>
      <button
        className="btnAdmin"
        onClick={() => console.log(localStorage.getItem("ID_Usuario"))}
      >
        <img className="icon" src="suport.png" alt="suporte" /> Suporte
      </button>

      <button
        className="btnConfig"
        onClick={() => setModalConfig(!modalConfig)}
      >
        <img className="icon" src="setting.png" alt="config" /> Configurações
      </button>

      <button className="btnSair" onClick={onLogout}>
        <img className="icon" src="logout.png" alt="sair" /> Sair
      </button>

      {/* Modal Configurações */}
      {modalConfig && (
        <div className="modalConfig">
          <button className="btnModal" onClick={handleOpenEdit}>
            Alterar Perfil
          </button>
          <button className="btnModal delete" onClick={handleDeleteAccount}>
            Deletar Conta
          </button>
        </div>
      )}

      {/* Modal Editar Perfil */}
      {modalEdit && (
        <div className="modalEdit">
          <h2>Editar Perfil</h2>
          <input
            type="email"
            value={userData.Usuario_Email}
            onChange={(e) =>
              setUserData({ ...userData, Usuario_Email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            value={userData.Usuario_Senha}
            onChange={(e) =>
              setUserData({ ...userData, Usuario_Senha: e.target.value })
            }
            placeholder="Senha"
          />
          <input
            type="text"
            value={userData.Usuario_Cargo}
            onChange={(e) =>
              setUserData({ ...userData, Usuario_Cargo: e.target.value })
            }
            placeholder="Cargo"
          />
          <div className="modalActions">
            <button onClick={onUpdate}>Alterar</button>
            <button onClick={() => setModalEdit(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default SidebarAdmin;
