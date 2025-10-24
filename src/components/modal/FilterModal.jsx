import React from "react";

function FiltroModal({

  isOpen,
  onClose,
  filtros,
  setFiltros,
  valorSelecionado,
  setValorSelecionado,
  filterSelecionado,
  setFilterSelecionado,
  valorFiltro,
  setValorFiltro,
  opcoesNumericas,
  opcoesTextuais,
  usuariosOriginais,
  setUsuarios,
}) {
  if (!isOpen) return null;

  const aplicarFiltros = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/filtrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filtros }),
      });
      if (!response.ok) throw new Error("Erro ao buscar dados do servidor");
      const data = await response.json();
      setUsuarios(data);
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
          <select
            name="selectFilter"
            value={valorSelecionado}
            onChange={(e) => setValorSelecionado(e.target.value)}
          >
            <option value="Usuario_Nome">Nome</option>
            <option value="ID_Usuario">ID do usuário</option>
            <option value="Usuario_CPF">CPF</option>
            <option value="Usuario_Empresa">Empresa</option>
            <option value="Usuario_Email">Email</option>
            <option value="Usuario_Telefone">Telefone</option>
            <option value="created_at">Data de criação</option>
          </select>

          <select
            value={filterSelecionado}
            onChange={(e) => setFilterSelecionado(e.target.value)}
          >
            {(valorSelecionado === "ID_Usuario"
              ? opcoesNumericas
              : opcoesTextuais
            ).map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

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
                  {(f.campo || "").replace("Usuario_", "")} {f.condicao} "
                  {f.valor}"
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
              setUsuarios(usuariosOriginais);
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
