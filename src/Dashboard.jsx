import React from 'react';
import './index.css';

const PainelSuporte = () => {
  const tutoriais = [
    { titulo: "Como cadastrar alimentos?" },
    { titulo: "Como cadastrar fornecedores?" },
    { titulo: "Como cadastrar alimentos?" },
    { titulo: "Como cadastrar fornecedores?" }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar simples */}
      <aside className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li>Início</li>
          <li>Suporte</li>
          <li>Tutoriais</li>
          <li>Configurações</li>
        </ul>
      </aside>

      <main className="conteudo-principal">   
        

        <div className="conteudo">
          {/* Painel Suporte */}
          <section className="painel-suporte">
            <h2>Suporte</h2>
            <div className="caixa-status verde">
              <p>Chamados abertos</p>
              <span>4</span>
            </div>
            <div className="caixa-status amarelo">
              <p>Chamados em solução</p>
              <span>3</span>
            </div>
            <div className="caixa-status cinza">
              <p>Chamados finalizados</p>
              <span>5</span>
            </div>
            <button className="botao-abrir-chamado">Abrir mais chamados +</button>
          </section>

          {/* Painel Tutoriais */}
          <section className="painel-tutoriais">
            <h2>Tutoriais</h2>
            <div className="grade-tutoriais">
              {tutoriais.map((tutorial, indice) => (
                <div key={indice} className="cartao-tutorial">
                  <div className="miniatura" />
                  <p>{tutorial.titulo}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PainelSuporte;
