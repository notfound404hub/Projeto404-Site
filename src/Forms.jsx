import { useState } from "react";

function Forms() {
  const [qtdIntegrantes, setQtdIntegrantes] = useState(0)
  const [integrantes, setIntegrantes] = useState([])
  const [step,setStep] = useState(0)
  const opcoes = [5, 6, 7, 8, 9, 10]

  const selecionar = (valor) => {
    setQtdIntegrantes(valor)
    setIntegrantes(Array(valor).fill(""))
  }

  const criarInput = (index, valor) => {
    const copia = [...integrantes]
    copia[step] = valor
    setIntegrantes(copia)
  }

  const proximo = () => {
    if(step < qtdIntegrantes){
      setStep(step+1)
    }
  }

  const anterior = () => {
    if(step > 0){
      setStep(step - 1)
    }
  }

  const finalizar = () => {
    console.log("Dados finais:", integrantes)
    alert("Cadastro concluído!")
  }
  
  const navigate = useNavigate()

  const irParaCadastro = () =>{
    localStorage.setItem("qtdIntegrantes", qtdIntegrantes)
    navigate("/cadastroalunos")
  }

  return (
    <div className="forms">
      <div className="formsTitulo">
        <header className="headerForms">
          <img src="LogoFundoBranco.avif" alt="logo" />
          <h1>Lideranças Empáticas</h1>
        </header>
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

        <div className="pergunta">
          <p className="p1Titulo">
            1.0 Digite o nome do grupo: *
          </p>
          <div className="inputPergunta">
            <input type="text" placeholder="Nome do grupo" />
          </div>
        </div>

        {step === 0 && (

        <div className="pergunta">
          <p>2.0  Quantos integrante o seu grupo possui?</p>
          <div className="inputPergunta">
            {opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="radio"
                  name="qtdIntegrantes"
                  value={opcao}
                  checked={qtdIntegrantes === opcao}
                  onChange={() => selecionar(opcao)}
                />
                {opcao}
              </label>
            ))}

          </div>

        </div>
        
        )}

        <div className="pergunta">
          <p>3.0  Digite o código do seu curso que se encontra no Moodle (Exemplo: 2NAADM/2MADM) </p>
          <div className="inputPergunta">
            <input type="text"
              placeholder="Curso"
            />
          </div>
        </div>

        <div className="pergunta">
          <p>4.0  Digite a senha geral do grupo</p>
          <div className="inputPergunta">
            <input type="password"
              placeholder="Senha"
            />

          </div>

        </div>

      </div>

      <div className="acoes">
        <button className="proximo"
        disabled={qtdIntegrantes===0}
        onClick={irParaCadastro}
        >
          Próximo          

        </button>
      </div>
    </div>
  );
}

export default Forms;
