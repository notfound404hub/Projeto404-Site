import React, { useState } from "react";

const opcoesNumericas = [
  { value: "igual", label: "é igual a" },
  { value: "maior", label: "é maior que" },
  { value: "menor", label: "é menor que" },
];

const opcoesTextuais = [
  { value: "igual", label: "é igual a" },
  { value: "contem", label: "contém" },
  { value: "naoContem", label: "não contém" },
];

function FiltroModal({
  isOpen,
  onClose,
  filtros,
  setFiltros,
  valorSelecionado,
  setValorSelecionado,
  filterSelecionado,
  setFilterSelecionado,
  usuariosOriginais,
  setResponse,
  campos,
  tabela,
}) {
  // ✅ Mover useState pra dentro do componente
  const [valorFiltro, setValorFiltro] = useState("");

  if (!isOpen) return null;

  const aplicarFiltros = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/filtrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filtros, tabela }),
      });
      if (!response.ok) throw new Error("Erro ao buscar dados do servidor");
      const data = await response.json();
      setResponse(data);
      onClose();
    } catch (err) {
      console.error("Erro ao aplicar filtros:", err);
      alert("Erro ao aplicar filtros");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Filtrar Usuários</h2>

        <div className="sectionfilter">
          {/* Select de campo */}
          <select
            name="selectFilter"
            value={valorSelecionado}
            onChange={(e) => setValorSelecionado(e.target.value)}
          >
            {campos.map((campo) => (
              <option key={campo.value} value={campo.value}>
                {campo.label}
              </option>
            ))}
          </select>

          {/* Select de condição */}
          <select
            value={filterSelecionado}
            onChange={(e) => setFilterSelecionado(e.target.value)}
          >
            {(valorSelecionado === "ID_Usuario" ||
            valorSelecionado === "Campanha_Meta" ||
            valorSelecionado === "Campanha_Quantidade" ||
            valorSelecionado === "ID_Campanha"
              ? opcoesNumericas
              : opcoesTextuais
            ).map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

          {/* Input de valor */}
          <input
            type="text"
            placeholder="Digite o valor..."
            value={valorFiltro}
            onChange={(e) => setValorFiltro(e.target.value)}
          />

          <button
            className="btnFilter"
            onClick={() => {
              if (!valorFiltro.trim()) return alert("Digite um valor!");
              const novoFiltro = {
                campo: valorSelecionado,
                condicao: filterSelecionado,
                valor: valorFiltro.trim(),
              };
              setFiltros((prev) => [...prev, novoFiltro]);
              setValorFiltro("");
            }}
          >
            Adicionar
          </button>
        </div>

        {filtros.length > 0 && (
          <div className="lista-filtros">
            <h4>Filtros adicionados:</h4>
            {filtros.map((f, i) => (
              <div key={i} className="filtro-item">
                <span>
                  {f.campo?.replace("Usuario_", "")} {f.condicao} "{f.valor}"
                </span>
                <button
                  className="btnRemoverFiltro"
                  onClick={() =>
                    setFiltros((prev) => prev.filter((_, idx) => idx !== i))
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="footerModal">
          <button className="btnFilter" onClick={aplicarFiltros}>
            Aplicar Filtros
          </button>
          <button
            className="btnFilter"
            onClick={() => {
              setResponse(usuariosOriginais);
              setFiltros([]);
              onClose();
            }}
          >
            Limpar Filtros
          </button>
          <button className="btnFilter" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FiltroModal;
