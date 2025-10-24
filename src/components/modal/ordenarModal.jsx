import React from "react";

function OrderModal({
  isOpen,
  onClose,
  valorSelecionado,
  setValorSelecionado,
  filterSelecionado,
  setFilterSelecionado,
  setUsuarios,
}) {
  // 🔸 Se o modal estiver fechado, não renderiza nada
  if (!isOpen) return null;

  // 🔹 Função que envia a ordenação para o backend
  const ordenar = async () => {
    try {
      const body = {
        campo: valorSelecionado,
        direcao: filterSelecionado,
      };

      console.log("📤 Enviando para backend:", body);

      const response = await fetch("http://localhost:500/api/users/ordenar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log("📥 Status da resposta:", response.status);

      if (!response.ok) throw new Error("Erro ao buscar dados do servidor");

      const data = await response.json();
      console.log("✅ Dados recebidos:", data);

      setUsuarios(data);
      onClose();
    } catch (error) {
      console.error("❌ Erro ao aplicar ordenação:", error);
      alert("Erro ao aplicar ordenação. Veja o console para detalhes.");
    }
  };

  // 🔹 Retorno JSX
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ordenar Usuários</h2>

        <div className="sectionfilter">
          <select
            onChange={(e) => setValorSelecionado(e.target.value)}
            value={valorSelecionado}
          >
            <option value="ID_Usuario">ID do usuário</option>
            <option value="Usuario_Nome">Nome</option>
            <option value="Usuario_CPF">CPF</option>
            <option value="Usuario_Empresa">Empresa</option>
            <option value="Usuario_Email">Email</option>
            <option value="Usuario_Telefone">Telefone</option>
            <option value="created_at">Data de criação</option>
          </select>

          <select
            onChange={(e) => setFilterSelecionado(e.target.value)}
            value={filterSelecionado}
          >
            <option value="asc">Crescente</option>
            <option value="desc">Decrescente</option>
          </select>
        </div>

        <div className="footerModal">
          <button className="btnFilter" onClick={ordenar}>
            Ordenar
          </button>
          <button className="btnFilter" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
