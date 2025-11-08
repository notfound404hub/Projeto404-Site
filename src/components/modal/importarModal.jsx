import React, { useState } from "react";
import api from "../../api";

function ImportarModal({
  isOpen,
  onClose,
  onImportSuccess,
  handleExportarUsuarios,
  tabela,
}) {
  let rota = "";
  switch (tabela) {
    case "Usuario ":
      rota = "/importarUsuarios";
      break;
    case "Campanha ":
      rota = "/importarCampanha";
      break;
  }

  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  const handleEnviarArquivo = async () => {
    if (!selectedFile) {
      alert("Selecione um arquivo primeiro!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log(" Enviando arquivo Excel para o backend...");

      const response = await api.post(rota, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      

      const data = response.data;
      alert(`${data.msg}`);
      console.log(" Importação concluída:", data);

      // Atualiza lista principal após sucesso
      if (onImportSuccess) onImportSuccess();

      // Fecha o modal
      onClose();
    } catch (error) {
      console.error(" Erro no envio da planilha:", error);
      alert("Erro ao importar planilha");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Importar Usuários</h2>
        <p>
          Baixe o molde abaixo, preencha as informações e envie a planilha para
          importar os usuários.
        </p>

        {/* 🔹 Seção principal do modal */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            className="export botaoLogin"
            onClick={handleExportarUsuarios}
          >
            Baixar molde (todos usuários)
          </button>

          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        {/* 🔹 Rodapé do modal */}
        <div className="footerModal">
          <button className="btnFilter" onClick={onClose}>
            Fechar
          </button>

          <button className="btnFilter" onClick={handleEnviarArquivo}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportarModal;
