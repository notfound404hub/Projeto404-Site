import React, { useEffect, useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

const ModalChamado = ({ chamado, onClose }) => {
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novaMensagem, setNovaMensagem] = useState("");

  const carregarMensagens = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/getMensagensChamado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ID_Chamado: chamado.ID_Chamado }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagens(data);
      } else {
        alert(data.error || "Erro ao carregar mensagens.");
      }
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      alert("Erro no servidor ao buscar mensagens.");
    } finally {
      setLoading(false);
    }
  };
  
  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return alert("Digite uma mensagem antes de enviar.");
    const ID_Usuario = localStorage.getItem("ID_Usuario");

    try {
      const response = await fetch("http://localhost:500/api/users/enviarMensagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ID_Chamado: chamado.ID_Chamado,
          Mensagem: novaMensagem,
          Remetente: ID_Usuario
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNovaMensagem("");
        carregarMensagens(); // Atualiza a lista
      } else {
        alert(data.error || "Erro ao enviar mensagem.");
      }
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Erro no servidor ao enviar mensagem.");
    }
  };

  useEffect(() => {
    carregarMensagens();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="chamados-header">
          <h2>{chamado.Chamado_Titulo}</h2>
          <button className="btn-fechar-modal" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <p>
          <strong>Status:</strong> {chamado.Chamado_Status}
        </p>

        {loading ? (
          <p>Carregando mensagens...</p>
        ) : mensagens.length === 0 ? (
          <p>Nenhuma mensagem encontrada.</p>
        ) : (
          <div className="mensagens-lista">
            {mensagens.map((m) => (
              <div key={m.ID_Mensagem} className="mensagem-item">
                <p>{m.Mensagem}</p>
                <small>{m.DataEnvio}</small>
              </div>
            ))}
          </div>
        )}

        <div className="enviar-mensagem">
          <input
            type="text"
            className="input-mensagem"
            placeholder="Digite sua mensagem..."
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
          />
          <button className="btn-enviar" onClick={enviarMensagem}>
            <FaPaperPlane /> Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalChamado;
