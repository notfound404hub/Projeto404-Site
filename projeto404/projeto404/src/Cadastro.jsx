import { useState } from "react"

function Cadastro() {
    return (
        <aside className="asideCadastro">
            <img className="logoCadastro" src="./src/assets/logo.png" alt="logo" />
            <h1 className="h1Cadastro">Crie sua conta agora e impusione o lideranças empáticas</h1>


            <form className="formNome">
                <div className="inputGroupCadastro">

                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="nome"
                />
                <label className="labelCadastro" htmlFor="nome">Nome*</label>

                </div>
                
                <div className="inputGroupCadastro">

                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="matricula"
                />
                <label className="labelCadastro" htmlFor="matricula">Matrícula*</label>
                             
                </div>
            </form>
            
            <form className="formEmail">

                <div className="inputGroupCadastro">

                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="email"
                />
                <label className="labelCadastro" htmlFor="email">E-mail*</label>

                </div>

                <div className="inputGroupCadastro">

                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="cpf"
                />
                <label className="labelCadastro" htmlFor="cpf">CPF ou CNPJ*</label>

                </div>

            </form>
                
            <form className="formTelefone">

                <div className="inputGroupCadastro">

                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="ddd"
                />
                <label className="labelCadastro" htmlFor="ddd">DDD*</label>

                </div>

                <div className="inputGroupCadastro">
                
                <input className="inputCadastro"
                    type="text"
                    placeholder=" "
                    id="telefone"
                />
                <label className="labelCadastro" htmlFor="telefone">Telefone*</label>

                </div>

            </form>

            <button className="btnProximo">Próximo</button>
            

        </aside>
    )
}

export default Cadastro;