import React, { useState } from "react";
import { FaTrashAlt, FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import ModalChamado from "./modal/ModalChamado";

const Chamados = ({ tipo, chamados, onVoltar, carregarChamados }) => {
  const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

  const filtrados = chamados.filter((c) => c.Chamado_Status === tipo);

  const excluirChamado = async (id) => {
    if (!window.confirm("Deseja realmente excluir este chamado?")) return;

    try {
      const response = await fetch(
        "http://localhost:500/api/users/deleteChamado",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ID_Chamado: id }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Chamado excluído com sucesso!");
        carregarChamados();
      } else {
        alert(data.error || "Erro ao excluir chamado.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir chamado.");
    }
  };

  return (
    <div className="chamados-tela">
      <div className="chamados-header">
        <h2>{tipo}</h2>
        <button className="btn-voltar" onClick={onVoltar}>
          <FaArrowLeft /> Voltar
        </button>
      </div>

      {filtrados.length === 0 ? (
        <p className="sem-chamados">Nenhum chamado encontrado.</p>
      ) : (
        <div className="lista-chamados">
          {filtrados.map((c) => (
            <div key={c.ID_Chamado} className="chamado-card">
              <div>
                <h3>{c.Chamado_Titulo}</h3>
                <p>Status: {c.Chamado_Status}</p>
                <small>
                  Criado em:{" "}
                  {new Date(c.created_at).toLocaleDateString("pt-BR")}
                </small>
              </div>
              <div className="acoes-chamado">
                <button
                  className="btn-entrar"
                  onClick={() => setChamadoSelecionado(c)}
                >
                  <FaSignInAlt /> Entrar
                </button>
                <button
                  className="btn-excluir"
                  onClick={() => excluirChamado(c.ID_Chamado)}
                >
                  <FaTrashAlt /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {chamadoSelecionado && (
        <ModalChamado
          chamado={chamadoSelecionado}
          onClose={() => setChamadoSelecionado(null)}
        />
      )}
    </div>
  );
};

export default Chamados;
