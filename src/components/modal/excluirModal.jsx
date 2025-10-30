import React from "react";

function DeleteModal({
  isOpen,
  onClose,
  selected,
  endpoint,
  setItens, 
  idField,
  carregarItens, 
  tabela
}) {
  if (!isOpen) return null;

  const excluirItens = async () => {
    if (selected.length === 0) {
      alert("Nenhum item selecionado para exclusão!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:500/api/users/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected , tabela}),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg || "Itens excluídos com sucesso!");
        setItens((prev) => prev.filter((item) => !selected.includes(item[idField])));
        carregarItens();
        onClose();
      } else {
        alert(data.error || "Erro ao excluir itens!");
      }
    } catch (err) {
      console.error("Erro ao excluir:", err);
      alert("Erro no servidor ao excluir itens");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmar exclusão</h2>
        <p>Deseja realmente excluir os itens selecionados?</p>

        <div className="footerModal">
          <button className="btnFilter" onClick={excluirItens}>
            Confirmar
          </button>
          <button className="btnFilter" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
