import React from "react";
import api from "../../api";

function EditModal({
  isOpen,
  alimentoEdit,
  setAlimentoEdit,
  onClose,
  carregarAlimentos
}) {
  if (!isOpen || !alimentoEdit) return null;

  const salvarEdicaoAlunos = async () => {
    try {
      const dadosEditaveis = {
        Alimento_Validade: alimentoEdit.Alimento_Validade,
        Aluno_Quantidade: alimentoEdit.Aluno_Quantidade
      };
      console.log(alimentoEdit)
      const response = await api.put(`/alimentos/${alimentoEdit.ID_Alimento}`, dadosEditaveis);
      setAlimentoEdit(response.data)
      alert("Alimento atualizado com sucesso!");
      onClose();
      carregarAlimentos();
    } catch (error) {
      console.error("Erro no update:", error);
      alert("Erro no servidor ao atualizar usuário");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Alimento</h2>

        <div className="formEdit">
          <label>ID:</label>
          <input type="text" value={alimentoEdit.ID_Alimentos} readOnly />

          <label>Nome:</label>
          <input
            type="text"
            value={alimentoEdit.Alimento_Validade || ""}
            onChange={(e) =>
              setAlunoEdit({ ...alimentoEdit, Alimento_Validade: e.target.value })
            }
          />

          <label>Telefone:</label>
          <input
            type="text"
            value={alimentoEdit.Aluno_Telefone || ""}
            onChange={(e) =>
              setAlunoEdit({
                ...alimentoEdit,
                Aluno_Telefone: e.target.value,
              })
            }
          />

          <label>Senha:</label>
          <input
            type="text"
            value={alimentoEdit.Aluno_Senha || ""}
            onChange={(e) =>
              setAlunoEdit({
                ...alimentoEdit,
                Aluno_Senha: e.target.value,
              })
            }
          />
        </div>

        <div className="footerModal">
          <button className="btnFilter" onClick={onClose}>
            Fechar
          </button>
          <button className="btnFilter" onClick={salvarEdicaoAlunos}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
