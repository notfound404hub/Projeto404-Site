// CadastroAlunos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroAlunos() {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [first, setFirst] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [alunos, setAlunos] = useState([]);
  const [step, setStep] = useState(0); // 0..remaining-1

  useEffect(() => {
    const totalStr = localStorage.getItem("totalIntegrantes");
    const totalNum = totalStr ? Number(totalStr) : 0;
    const firstSaved = localStorage.getItem("firstIntegrante");

    if (!totalNum) {
      // nada salvo → volta pro formulário inicial
      navigate("/", { replace: true });
      return;
    }

    if (!firstSaved) {
      // se o primeiro integrante não foi preenchido, manda pra rota responsável
      navigate("/cadastroinicial", { replace: true });
      return;
    }

    setTotal(totalNum);
    setFirst(firstSaved);
    const rem = Math.max(0, totalNum - 1);
    setRemaining(rem);
    setAlunos(Array(rem).fill(""));
    setStep(0);
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
    console.log("Todos os integrantes:", todos);
    alert("Cadastro concluído!");
  };

  if (remaining === 0) {
    const primeiro = localStorage.getItem("firstIntegrante");
    return (
      <div>
        <h2>Somente o 1º integrante</h2>
        <p>Primeiro integrante: {primeiro}</p>
        <button onClick={finalizar}>Finalizar (concluir cadastro)</button>
      </div>
    );
  }

  return (
    <div className="cadastro-alunos">
      <h2>Cadastro dos demais integrantes</h2>
      <p>
        Integrante {step + 2} de {total} {/* +2 porque o primeiro já foi salvo */}
      </p>

      <input
        type="text"
        placeholder={`Nome do integrante ${step + 2}`}
        value={alunos[step] || ""}
        onChange={(e) => handleAlunoChange(step, e.target.value)}
      />

      <div style={{ marginTop: 12 }}>
        {step > 0 && <button onClick={anterior}>Anterior</button>}
        {step < remaining - 1 && <button onClick={proximo}>Próximo</button>}
        {step === remaining - 1 && <button onClick={finalizar}>Finalizar</button>}
      </div>
    </div>
  );
}

export default CadastroAlunos;
