// CadastroAlunos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroAlunos() {
  const navigate = useNavigate();
  const [qtd, setQtd] = useState(0);
  const [first, setFirst] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [alunos, setAlunos] = useState([]);
  const [step, setStep] = useState(0); 
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const totalStr = localStorage.getItem("qtdIntegrantes");
    const totalNum = totalStr ? Number(totalStr) : 0;
    const firstSaved = localStorage.getItem("firstIntegrante") || null;

    console.log("DEBUG CadastroAlunos - totalNum:", totalNum, "firstSaved:", firstSaved);

    if (!totalNum) {
      navigate("/forms", { replace: true });
      return;
    }

    if (!firstSaved) {
      navigate("/cadastroalunomentor", { replace: true });
      return;
    }

    setQtd(totalNum);
    setFirst(firstSaved);
    const rem = Math.max(0, totalNum - 1);
    setRemaining(rem);
    setAlunos(Array(rem).fill(""));
    setStep(0);
    setReady(true);
  }, [navigate]);

  const handleAlunoChange = (index, value) => {
    setAlunos((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const proximo = () => {
    if (step < remaining - 1) setStep((s) => s + 1);
  };
  const anterior = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const finalizar = () => {
    const primeiro = localStorage.getItem("firstIntegrante");
    const todos = primeiro ? [primeiro, ...alunos] : [...alunos];
    console.log("Todos os integrantes (final):", todos);
    alert("Cadastro concluído!");
    navigate("/"); 
  };

  if (!ready) return <p>Carregando...</p>;

  if (remaining === 0) {
    return (
      <div>
        <h2>Somente o 1º integrante</h2>
        <p>Primeiro integrante: {first}</p>
        <button type="button" onClick={finalizar}>
          Finalizar (concluir cadastro)
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2>Cadastro dos demais integrantes</h2>
      <p>
        Integrante {step + 2} de {qtd} 
      </p>

      <input
        type="text"
        placeholder={`Nome do integrante ${step + 2}`}
        value={alunos[step] || ""}
        onChange={(e) => handleAlunoChange(step, e.target.value)}
      />

      <div style={{ marginTop: 12 }}>
        {step > 0 && <button type="button" onClick={anterior}>Anterior</button>}
        {step < remaining - 1 && <button type="button" onClick={proximo}>Próximo</button>}
        {step === remaining - 1 && <button type="button" onClick={finalizar}>Finalizar</button>}
      </div>
    </div>
  );
}
