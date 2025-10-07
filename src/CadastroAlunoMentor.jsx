// CadastroInicial.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroInicial() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const continuar = () => {
    if (!nome.trim()) {
      alert("Preencha o nome do primeiro integrante.");
      return;
    }
    localStorage.setItem("firstIntegrante", nome.trim());    
    navigate("/cadastroalunos");
  };

  return (
    <div className="cadastro-inicial">
      <h2>Cadastro do 1º integrante</h2>
      <input
        type="text"
        placeholder="Nome completo"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate(-1)} style={{ marginRight: 8 }}>
          Voltar
        </button>
        <button onClick={continuar}>Continuar</button>
      </div>
    </div>
  );
}

export default CadastroInicial;
