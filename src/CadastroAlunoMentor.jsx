import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroAlunoMentor() {
  const [mentor, setMentor] = useState("")
  const [mentorRA, setMentorRA] = useState("")
  const [mentorEmail, setMentorEmail] = useState("")
  const [mentorSenha, setMentorSenha] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    const qtd = Number(localStorage.getItem("qtdIntegrantes") || 0);
    if (!qtd) {
      navigate("/forms", { replace: true });
    }
  }, [navigate]);

  const continuar = () => {
    const mentorData ={
      nome: mentor.trim(),
      ra: mentorRA.trim(),
      email: mentorEmail.trim(),
      senha: mentorSenha.trim()
    }
    localStorage.setItem("firstIntegrante", JSON.stringify(mentorData));
    navigate("/cadastroalunos");
  };

  return (    
    <div className="formsMentor">
      <div className="formsTituloMentor">
        <header className="headerFormsMentor">
          <img className="logoForms" src="LogoFundoBranco.avif" alt="logo" />
          <h1>Lideranças Empáticas</h1>
        </header>
        <div className="TituloFormsMentor">
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
      

      <div className="perguntaMentor">
        <p className="tituloPerguntaMentor">1.0  Nome do aluno mentor</p>
      <input className="inputPerguntaMentor"
        type="text"
        placeholder="Nome do mentor"
        value={mentor}
        onChange={(e) => setMentor(e.target.value)}
      />
      </div>

      <div className="perguntaMentor"> 
        <p className="tituloPerguntaMentor">2.0  RA do aluno mentor</p>       
      <input className="inputPerguntaMentor"
        type="text"
        placeholder="RA do mentor"
        value={mentorRA}
        onChange={(e) => setMentorRA(e.target.value)}
      />
      </div>

      <div className="perguntaMentor">
        <p className="tituloPerguntaMentor">3.0  Email do aluno mentor</p>
      <input className="inputPerguntaMentor"
        type="email"
        placeholder="Email do mentor"
        value={mentorEmail}
        onChange={(e) => setMentorEmail(e.target.value)}
      />
      <div className="pergunta">
          <p className="pTitulo">4.0 Digite a senha</p>
        <div>
          <input 
          className="inputPergunta" 
          type="password"
          value={mentorSenha} 
          onChange={(e) => setMentorSenha(e.target.value)}
          placeholder="Senha" />
        </div>
      </div>

      

      </div>
      <div className="divBotoesMentor">
        <button className = "voltar" type="button" onClick={() => navigate(-1)}>
          Voltar
        </button>
        <button className="proximoMentor" 
        type="button" 
        disabled = {mentor === "" || mentorRA === "" ||  mentorEmail === "" } 
        onClick={continuar}>
          Próximo
        </button>
      </div>
      </div>
    </div>
  );
}
