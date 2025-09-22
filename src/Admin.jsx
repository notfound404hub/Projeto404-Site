import { useState } from "react";

function Admin() {
  const [modalConfig, setModalConfig] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [userData, setUserData] = useState({
    Usuario_Email: "",
    Usuario_Senha: "",
    Usuario_Cargo: ""
  });

  const handleDeleteAccount = async () => {
    const Usuario_ID = localStorage.getItem("Usuario_ID");
    if (!Usuario_ID) {
      alert("Usuário não identificado!");
      return;
    }

    try {
      const response = await fetch(
        `https://projeto404-site-backend.vercel.app/api/users/usuario/${Usuario_ID}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      alert(data.msg || data.error);

      if (response.ok) {
        localStorage.removeItem("Usuario_ID");
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Erro ao deletar conta:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Usuario_ID");
    window.location.href = "/";
  };

  const handleOpenEdit = async () => {
    const Usuario_ID = localStorage.getItem("Usuario_ID");
    console.log("handleOpenEdit chamado - Usuario_ID salvo:", Usuario_ID);

    if (!Usuario_ID) {
      alert("Usuário não identificado!");
      return;
    }

    try {
      const response = await fetch(
        `https://projeto404-site-backend.vercel.app/api/users/usuario/${Usuario_ID}`
      );
      console.log("Response do backend:", response);

      const data = await response.json();
      console.log("Dados recebidos:", data);

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

  const handleUpdate = async () => {
    const Usuario_ID = localStorage.getItem("Usuario_ID");
    try {
      const response = await fetch(
        `https://projeto404-site-backend.vercel.app/api/users/usuario/${Usuario_ID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        }
      );
      const data = await response.json();
      alert(data.msg || data.error);
      if (response.ok) {
        setModalEdit(false);
      }
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  return (
    <div className="bodyAdmin">
      <header className="headerAdmin">
        <div className="linha"></div>

        <div className="divPesquisar">
          <div className="divEsquerda">
            <input
              className="inputAdmin"
              type="text"
              id="pesquisa"
              placeholder="Pesquisar "
            />
            <button className="btnPesquisa">
              <img
                className="iconPesquisa"
                src="search.png"
                alt="pesquisa"
              />
            </button>
          </div>

          <div className="divDireita">
            <button className="btnNotif">
              <img
                className="btnDivDireita"
                src="notification.png"
                alt="notif"
              />
            </button>

            <button className="btnChat">
              <img
                className="btnDivDireita"
                src="bubble-chat.png"
                alt="chat"
              />
            </button>

            <button className="btnPerfil">
              <img
                className="btnDivDireita"
                src="user.png"
                alt="user"
              />
            </button>
          </div>
        </div>
      </header>

      <aside className="asideAdmin">
        <img
          className="logoAdmin"
          src="LogoFundoBranco.avif"
          alt="logo"
        />
        <button className="btnAdmin">
          <img className="icon" src="home.png" alt="home" />
          Página inicial
        </button>
        <button className="btnAdmin">
          <img className="icon" src="report.png" alt="relatorio" />
          Relatórios
        </button>
        <button className="btnAdmin">
          <img className="icon" src="verify.png" alt="cadastros" />
          Cadastros
        </button>
        <button className="btnAdmin">
          <img className="icon" src="heart.png" alt="doacoes" />
          Doações
        </button>
        <button className="btnAdmin">
          <img
            className="icon"
            src="restaurant.png"
            alt="alimentos"
          />
          Alimentos
        </button>
        <button className="btnAdmin">
          <img className="icon" src="dollar.png" alt="dinheiro" />
          Dinheiro
        </button>
        <button className="btnAdmin">
          <img
            className="icon"
            src="graduation.png"
            alt="usuarios"
          />
          Usuários
        </button>
        <button className="btnAdmin">
          <img
            className="icon"
            src="administrator.png"
            alt="administrativo"
          />
          Administrativo
        </button>
        <button
          className="btnAdmin"
          onClick={() => console.log(localStorage.getItem("Usuario_ID"))}
        >
          <img className="icon" src="suport.png" alt="suporte" />
          Suporte
        </button>
        <button
          className="btnConfig"
          onClick={() => setModalConfig(!modalConfig)}
        >
          <img className="icon" src="setting.png" alt="config" />
          Configurações
        </button>
        <button className="btnSair" onClick={handleLogout}>
          <img className="icon" src="logout.png" alt="sair" />
          Sair
        </button>

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
              <button onClick={handleUpdate}>Alterar</button>
              <button onClick={() => setModalEdit(false)}>Cancelar</button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default Admin;