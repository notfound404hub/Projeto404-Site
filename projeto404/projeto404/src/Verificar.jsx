import{useState} from "react"

function Verificar(){
    return(
        <aside className="asideVerificar">
            <img className="logoVerificar" src="./src/assets/LogoFundoBranco.avif" alt="logo" />
            <h1 className="h1VerificarEmail">Verificação de E-mail</h1>
            <h1 className="h1Verificar">Um código de verificação foi  enviado para o seu e-mail!
            Verifique sua caixa de e-mail e entre na sua conta!</h1>
            <input className="inputCodigo" 
            type="text" 
            id="codigo" 
            placeholder ="XXXXXX"                      
            />
            <p>Não recebeu? <a href="">Reenviar código</a></p>

            <button>Entrar</button>

        </aside>
        

    )
}

export default Verificar;