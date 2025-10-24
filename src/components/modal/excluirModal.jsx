import React from "react";

function DeleteModal({ isOpen, onClose, excluirUsuarios }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirmar exclusão</h2>
        <p>Deseja realmente excluir os usuários selecionados?</p>

        <div className="footerModal">
          <button className="btnFilter" onClick={excluirUsuarios}>
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
