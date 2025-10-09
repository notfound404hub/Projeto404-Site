// CadastroAlunoMentor.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroAlunoMentor() {
  const [mentor, setMentor] = useState("");
  const [mentorRA, setMentorRA] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const qtd = Number(localStorage.getItem("qtdIntegrantes") || 0);
    if (!qtd) {
      navigate("/forms", { replace: true });
    }
  }, [navigate]);

  const continuar = () => {
    if (!mentor.trim()) {
      alert("Preencha o nome do mentor.");
      return;
    }
    if (!mentorEmail.trim()) {
      alert("Preencha o email do mentor.");
      return;
    }
    if (!mentorRA.trim()) {
      alert("Preencha o RA do mentor.");
      return;
    }    
    localStorage.setItem("firstIntegrante", mentor.trim());
    navigate("/cadastroalunos");
  };

  return (
    <div style={{ padding: 12 }}>
      <h2>Cadastro do 1º integrante (mentor)</h2>
      <input
        type="text"
        placeholder="Nome do mentor"
        value={mentor}
        onChange={(e) => setMentor(e.target.value)}
      />
      <input
        type="text"
        placeholder="RA do mentor"
        value={mentorRA}
        onChange={(e) => setMentorRA(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email do mentor"
        value={mentorEmail}
        onChange={(e) => setMentorEmail(e.target.value)}
      />
      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={() => navigate(-1)} style={{ marginRight: 8 }}>
          Voltar
        </button>
        <button type="button" onClick={continuar}>
          Continuar
        </button>
      </div>
    </div>
  );
}
