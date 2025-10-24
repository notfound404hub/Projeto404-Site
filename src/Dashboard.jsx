import React from 'react';


const Suporte = () => {
  const tutoriais = [
    { titulo: "Como cadastrar alimentos?" },
    { titulo: "Como cadastrar fornecedores?" },
    { titulo: "Como cadastrar alimentos?" },
    { titulo: "Como cadastrar fornecedores?" }
  ];

  return (
    <div className="suporte-container">
      <div className="suporte-content">
        {/* Painel Suporte */}
        <section className="painel-suporte">
          <h2 className="titulo-secao">Suporte</h2>
          
          <div className="caixa-status verde">
            <p>Chamados abertos</p>
            <span className="numero">4</span>
          </div>
          
          <div className="caixa-status amarelo">
            <p>Chamados em solução</p>
            <span className="numero">3</span>
          </div>
          
          <div className="caixa-status cinza">
            <p>Chamados finalizados</p>
            <span className="numero">5</span>
          </div>
          
          <button className="botao-abrir-chamado">
            Abrir mais chamados +
          </button>
        </section>

        {/* Painel Tutoriais */}
        <section className="painel-tutoriais">
          <h2 className="titulo-secao">Tutoriais</h2>
          
          <div className="grade-tutoriais">
            {tutoriais.map((tutorial, indice) => (
              <div key={indice} className="cartao-tutorial">
                <div className="miniatura"></div>
                <p className="titulo-tutorial">{tutorial.titulo}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Suporte;