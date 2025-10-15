// CadastroAlunos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroAlunos() {
  const navigate = useNavigate();
  const [qtd, setQtd] = useState(0);
  const [first, setFirst] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [alunos, setAlunos] = useState([]);
  const [alunoRA, setAlunoRA] = useState([])
  const [alunoEmail, setAlunoEmail] = useState([])
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const camposInvalidos = !alunos[step]?.trim() || !alunoEmail[step]?.trim() || !alunoRA[step]?.trim()
  

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
    setAlunoEmail(Array(rem).fill(""))
    setAlunoRA(Array(rem).fill(""))
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

  const handleRAChange = (index, value) => {
    setAlunoRA((prev) => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  const handleEmailChange = (index, value) => {
    setAlunoEmail((prev) => {
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }

  const proximo = () => {
    if (step < remaining - 1) setStep((s) => s + 1);
  };
  const anterior = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const finalizar = () => {
    const primeiro = localStorage.getItem("firstIntegrante");
    const todosAlunos = primeiro ? [primeiro, ...alunos] : [...alunos];
    const matriculas = [...alunoRA]
    const email = [...alunoEmail]
    const todosJuntos = todosAlunos.map((nome, i) => ({
      nome,
      alunoRA: [i],
      alunoEmail: [i],
    }))
    console.log("Todos os integrantes (final):", todosJuntos);
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
    <div className="formsAlunos">
      <div className="formsTituloAlunos">
        <header className="headerFormsAlunos">
          <img className="logoForms" src="LogoFundoBranco.avif" alt="logo" />
          <h1>Lideranças Empáticas</h1>
        </header>
        <div className="tituloFormsAlunos">
          <h2>
            Este questionário foi desenvolvido para facilitar o cadastro de todos
            os grupos da FECAP interessados em participar do projeto "Lideranças
            Empáticas".
          </h2>
          <p>
            As informações aqui coletadas serão tratadas de forma anônima e
            protegida. Como o projeto é exclusivo para membros da Fundação,
            pedimos que utilizem o e-mail institucional da FECAP para que possamos
            realizar o controle dos alunos participantes.
          </p>
        </div>
      </div>

      <div className="perguntaAlunos">
        <p className="tituloPerguntaAluno">1.0   Nome do {step + 2}° integrante</p>
        <input className="inputPerguntaAluno"
          type="text"
          placeholder={`Nome do integrante ${step + 2}`}
          value={alunos[step] || ""}
          onChange={(e) => handleAlunoChange(step, e.target.value)}
        />
      </div>

      <div className="perguntaAlunos">
        <p className="tituloPerguntaAluno">2.0   RA do {step + 2}° integrante</p>
        <input className="inputPerguntaAluno"
          type="text"
          placeholder={`RA do integrante ${step + 2}`}
          value={alunoRA[step] || ""}
          onChange={(e) => handleRAChange(step, e.target.value)}
        />
      </div>

      <div className="perguntaAlunos">
        <p className="tituloPerguntaAluno">3.0   Email do {step + 2}° integrante</p>
        <input className="inputPerguntaAluno"
          type="email"
          placeholder={`Email do integrante ${step + 2}`}
          value={alunoEmail[step] || ""}
          onChange={(e) => handleEmailChange(step, e.target.value)}
        />
      </div>

      <div className={`botoesAluno ${step > 0 ? "dois-botoes" : "um-botao"}`}>
        {step > 0 && (
          <button className="voltarAluno" type="button" onClick={anterior}>
            Anterior
          </button>
        )}

        {step < remaining - 1 && (
          <button className="proximoAluno" type="button" disabled = {camposInvalidos}  onClick={proximo}>
            Próximo
          </button>
        )}

        {step === remaining - 1 && (
          <button className="finalizar" type="button" disabled = {camposInvalidos}  onClick={finalizar}>
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}
