import React, { useState } from "react";

export default function CriacaoChamado({
  onClose,
  onChamadoAdicionado,
  carregarChamados,
}) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const adicionarChamado = async () => {
    if (!titulo || !descricao) {
      alert("Preencha o título e a descrição!");
      return;
    }

    setLoading(true);
    const Chamado_Criador = localStorage.getItem("ID_Usuario");

    try {
      const response = await fetch(
        "http://localhost:500/api/users/AdicionarChamados",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Chamado_Titulo: titulo,
            Mensagem: descricao,
            Chamado_Criador,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Chamado criado com sucesso!");
        if (onChamadoAdicionado) onChamadoAdicionado(data);
        if (carregarChamados) carregarChamados(); // <-- chama aqui!
        onClose();
      } else {
        alert(data.error || "Erro ao criar chamado.");
      }
    } catch (err) {
      console.error("Erro ao criar chamado:", err);
      alert("Erro no servidor ao criar chamado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Adicionar chamado</h2>

        <p>Digite o título do chamado abaixo!</p>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título do chamado"
        />

        <p>Descreva de forma detalhada o problema encontrado!</p>
        <textarea
          rows="8"
          cols="50"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o chamado aqui..."
        ></textarea>

        <button
          type="button"
          className="tipo-btn entrada"
          onClick={adicionarChamado}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Adicionar +"}
        </button>

        <button
          type="button"
          className="tipo-btn saida"
          onClick={() => {
            onClose();
            carregarChamados();
          }}
        >
          Cancelar +
        </button>
      </div>
    </div>
  );
}
