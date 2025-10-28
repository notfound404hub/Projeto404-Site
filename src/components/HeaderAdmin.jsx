import { useState } from "react";
import Chat from "./modal/chat.jsx";

function HeaderAdmin() {
  const [showChat, setShowChat] = useState(false); // ✅ corrigido camelCase

  return (
    <header className="headerAdmin">
      <div className="divPesquisar">
        <div className="divEsquerda">
          <input className="inputAdmin" type="text" placeholder="Pesquisar" />
          <button className="btnPesquisa">
            <img className="iconPesquisa" src="search.png" alt="pesquisa" />
          </button>
        </div>

        <div className="divDireita">
          <button className="btnNotif">
            <img
              className="btnDivDireita"
              src="notification.png"
              alt="notificação"
            />
          </button>

          <button className="btnChat" onClick={() => setShowChat(true)}>
            <img className="btnDivDireita" src="bubble-chat.png" alt="chat" />
          </button>

          <button className="btnPerfil">
            <img className="btnDivDireita" src="user.png" alt="usuário" />
          </button>
        </div>
      </div>

      {/* 🔹 O chat só aparece se showChat = true */}
      <Chat isOpen={showChat} onClose={() => setShowChat(false)} />
    </header>
  );
}

export default HeaderAdmin;
