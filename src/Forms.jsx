import { useState } from "react";

function Forms() {
    return (
        <div className="forms">
            <div className="formsTitulo">
                <header className="headerForms">
                    <img src="LogoFundoBranco.avif" alt="logo" />
                    <h1>Lideranças Empáticas</h1>
                </header>
                <h2>Este questionário foi desenvolvido para facilitar o cadastro de todos os grupos da FECAP interessados em participar do projeto "Lideranças Empáticas".</h2>
                <p> As informações aqui coletadas serão tratadas de forma anônima e protegida. Como o projeto é exclusivo para membros da Fundação, pedimos que utilizem o e-mail institucional da FECAP para que possamos realizar o controle dos alunos participantes. </p>

                <div className="pergunta1">
                    <p className="p1Titulo">1.0  Digite o nome do grupo:      *</p>
                    <div className="inputPergunta">
                        <input type="text"
                        placeholder="Nome do grupo"                       
                        />
                    </div>                                   
                </div>


            </div>
        </div>

    )
}

export default Forms;