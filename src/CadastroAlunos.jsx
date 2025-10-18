// CadastroAlunos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function CadastroAlunos() {
  const navigate = useNavigate();
  const [qtd, setQtd] = useState(0);
  const [first, setFirst] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [alunos, setAlunos] = useState({
    Aluno_Nome: [],
    Aluno_RA: [],
    Aluno_Email: [],
    Aluno_Senha: []
  })
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const camposInvalidos = !alunos.Aluno_Nome[step]?.trim() || !alunos.Aluno_Email[step]?.trim() || !alunos.Aluno_RA[step]?.trim() || !alunos.Aluno_Senha[step]?.trim()
  

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
    setAlunos({
      Aluno_Nome: Array(rem).fill(""),
      Aluno_RA:   Array(rem).fill(""),
      Aluno_Email:Array(rem).fill(""),
      Aluno_Senha:Array(rem).fill("")
    });
    setStep(0);
    setReady(true);
  }, [navigate]);

  const handleChange = (e) => {
    setAlunos({...alunos, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e) => {
    e.PreventDefault()
    try{
      const res = await axios.post("http://localhost:500/api/users/alunos", alunos)
      console.log("Resposta do backend: ", res.data)
      alert(res.data.msg)      
    }catch (err){
      console.error("Erro no cadastro:", err.response?.data || err.message)
      alert("Erro no cadastro:" + (err.response?.data?.error || err.message))
    }
  }

  const handleAlunosChange = (field, index, value) => {
    setAlunos(prev => ({
      ...prev,
      [field]: prev[field].map((item,i) => (i === index ? value : item))
    }))   
  };

  const proximo = () => {
    if (step < remaining - 1) setStep((s) => s + 1);
  };
  const anterior = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const finalizar = () => {
    const primeiro = JSON.parse(localStorage.getItem("firstIntegrante"))
    const todosAlunos = primeiro ? [primeiro.nome, ...alunos] : [...alunos]
    const matriculas = primeiro ? [primeiro.ra, ...alunoRA] : [...alunoRA]
    const email = primeiro ? [primeiro.email, ...alunoEmail] : [...alunoEmail]
    const senha = primeiro ? [primeiro.senha, ...alunoSenha] : [alunoSenha]
    const todosJuntos = todosAlunos.map((nome, i) => ({
      nome,
      matriculas: matriculas[i],
      email: email[i],
      senha: senha[i]
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
          value={alunos.Aluno_Nome[step] || ""}
          onChange={(e) => handleAlunosChange("Aluno_Nome", step, e.target.value)}
        />
      </div>

      <div className="perguntaAlunos">
        <p className="tituloPerguntaAluno">2.0   RA do {step + 2}° integrante</p>
        <input className="inputPerguntaAluno"
          type="text"
          placeholder={`RA do integrante ${step + 2}`}
          value={alunos.Aluno_RA[step] || ""}
          onChange={(e) => handleAlunosChange("Aluno_RA", step, e.target.value)}
        />
      </div>

      <div className="perguntaAlunos">
        <p className="tituloPerguntaAluno">3.0   Email do {step + 2}° integrante</p>
        <input className="inputPerguntaAluno"
          type="email"
          placeholder={`Email do integrante ${step + 2}`}
          value={alunos.Aluno_Email[step] || ""}
          onChange={(e) => handleAlunosChange("Aluno_Email", step, e.target.value)}
        />
      </div>

      <div className="pergunta">
          <p className="pTitulo">4.0 Digite a senha do {step+2}° integrante</p>
        <div>
          <input 
          className="inputPergunta" 
          type="password" 
          value={alunos.Aluno_Senha[step]}
          onChange={(e) => handleAlunosChange("Aluno_Senha", step, e.target.value)}
          placeholder={`Senha do integrante ${step+2}`} />
        </div>
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
