import { useState, useEffect } from "react";

function CadastroAlunos() {
  const [qtd, setQtd] = useState(0);       
  const [alunos, setAlunos] = useState([]); 
  const [step, setStep] = useState(1);     
  
  useEffect(() => {
    const valor = localStorage.getItem("qtdIntegrantes");
    if (valor) {
      const num = Number(valor);
      setQtd(num);
      setAlunos(Array(num).fill("")); 
    }
  }, []);

  const handleChange = (valor) => {
    const copia = [...alunos];
    copia[step - 1] = valor;
    setAlunos(copia);
  };

  const proximo = () => {
    if (step < qtd) setStep(step + 1);
  };

  const anterior = () => {
    if (step > 1) setStep(step - 1);
  };

  const finalizar = () => {
    console.log("Alunos cadastrados:", alunos);
    alert("Cadastro concluído!");
  };

  if (qtd === 0) {
    return <p>Nenhum número de integrantes foi selecionado.</p>;
  }

  return (
    <div className="cadastro-alunos">
      <h2>Cadastro dos integrantes</h2>
      <p>
        Aluno {step} de {qtd}
      </p>

      <input
        type="text"
        placeholder={`Nome do aluno ${step}`}
        value={alunos[step - 1] || ""}
        onChange={(e) => handleChange(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        {step > 1 && (
          <button onClick={anterior} style={{ marginRight: "5px" }}>
            Anterior
          </button>
        )}
        {step < qtd && (
          <button onClick={proximo} style={{ marginRight: "5px" }}>
            Próximo
          </button>
        )}
        {step === qtd && <button onClick={finalizar}>Finalizar</button>}
      </div>
    </div>
  );
}

export default CadastroAlunos;
