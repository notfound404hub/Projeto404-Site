import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Forms() {
  const [qtdIntegrantes, setQtdIntegrantes] = useState(0);
  const opcoes = [5, 6, 7, 8, 9, 10];
  const [grupo,setGrupo] = useState("")
  const [curso,setCurso] = useState("")
  const [senha,setSenha] = useState("")
  const navigate = useNavigate();

  const selecionar = (valor) => {
    setQtdIntegrantes(valor)
  };

  const irParaCadastroMentor = () => {
    if (!qtdIntegrantes || qtdIntegrantes <= 0) return
    localStorage.setItem("qtdIntegrantes", String(qtdIntegrantes))
    localStorage.removeItem("firstIntegrante")
    navigate("/cadastroalunomentor")
  };

  const handleSubmitSenha = async (e) =>{
    e.preventDefault()

    const response  = await fetch("http://localhost:3000/api/users",{
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({grupo,qtdIntegrantes, curso, senha})
    })
  }

  return (
    <div className="forms">
      <div className="formsTitulo">
        <header className="headerForms">
          <img className="logoForms" src="LogoFundoBranco.avif" alt="logo" />
          <h1>Lideranças Empáticas</h1>
        </header>
        <div className="divTituloForms">
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

        <div className="pergunta">
          <p>1.0 Digite o nome do grupo: *</p>
          <div>
            <input 
            className="inputPergunta" 
            type="text" 
            placeholder="Nome do grupo"
            value={grupo}
            onChange = {(e)=> setGrupo(e.target.value)}            
            />
          </div>
        </div>

        
          <div className="pergunta">
            <p className="pTitulo">2.0 Quantos integrantes o seu grupo possui?</p>
            <div className="divInputTypeRadio">
              {opcoes.map((op) => (
                <label key={op}>
                  <input className="inputTypeRadio"
                    type="radio"
                    name="qtdIntegrantes"
                    value={op}
                    checked={qtdIntegrantes === op}
                    onChange={() => selecionar(op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </div>        

        <div className="pergunta">
          <p className="pTitulo">
            3.0 Digite o código do seu curso que se encontra no Moodle (Exemplo:
            2NAADM/2MADM)
          </p>
          <div>
            <input 
            className="inputPergunta" 
            type="text" 
            placeholder="Curso" 
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            
            />
          </div>
        </div>
      </div>

      <div className="acoes">
        <button
          className="proximo"
          disabled={qtdIntegrantes === 0 || grupo === "" || curso === ""}
          onClick={irParaCadastroMentor}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}

export default Forms
