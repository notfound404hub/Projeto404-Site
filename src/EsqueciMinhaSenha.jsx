import { useState } from "react"
import axios from "axios"

function EsqueciMinhaSenha() {
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:500/api/users/auth/forgotPassword",
        { email }
      )
      setMensagem(response.data.message || "Email de recuperação enviado!")
    } catch (err) {
      console.error(err)
      setMensagem("Erro ao enviar o email de recuperação")
    }
  }

  return (
    <div className="divEsqueciSenha">
      <aside className="asideEsqueciSenha">
        <img className="logoEsqueciSenha" src="LogoFundoBranco.avif" alt="logo" />
        <h1 className="h1EsqueciSenha">Recuperação de senha</h1>
        <h2 className="h2EsqueciSenha">
          Para redefinir sua senha, digite seu e-mail abaixo.
          Você receberá um e-mail com as instruções para criar uma nova senha.
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="inputEsqueciSenha"
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btnEsqueciSenha">
            Recuperar senha
          </button>
        </form>

        <p className="pEsqueciSenha">
          Não recebeu? <a href="">Reenviar E-mail</a>
        </p>

        {mensagem && <p>{mensagem}</p>}
      </aside>
    </div>
  )
}

export default EsqueciMinhaSenha
