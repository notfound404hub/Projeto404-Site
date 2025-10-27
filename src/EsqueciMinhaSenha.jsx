import { useState } from "react"

function Verificar() {
    return (
        <div className="divEsqueciSenha">
            <aside className="asideEsqueciSenha">
                <img className="logoEsqueciSenha" src="LogoFundoBranco.avif" alt="logo" />
                <h1 className="h1EsqueciSenha">Recuperação de senha</h1>
                <h1 className="h2EsqueciSenha">Para redefinir sua senha, digite seu e-mail abaixo.
                    Você receberá um e-mail com as instruções para criar uma nova senha.</h1>
                <input className="inputEsqueciSenha"
                    type="email"
                    id="email"
                    placeholder="E-mail"
                />
                <p className="pEsqueciSenha">Não recebeu? <a href=""> Reenviar E-mail</a></p>

                <button className="btnEsqueciSenha">Recuperar senha</button>

            </aside>
        </div>
    )
}

export default Verificar;