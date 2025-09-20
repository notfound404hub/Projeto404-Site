import { useState } from 'react';
import './index.css'; // Certifique-se de que está importando seu CSS

function Login() {
  return (
    <div className="bodyImg"> {/* Corrigido: não se usa <body> dentro do React */}

      <div className="divLogin">
        <aside className="asideLogin">
          <img className="logo" src="./src/assets/logo.png" alt="Logo" />

          <p className="lbl_Bemvindo">
            Seja bem-vindo ao
            <br />
            Lideranças Empáticas
          </p>

          <form className="login">
            <div className="input-group">
              <input
                className="inputLogin"
                type="text"
                id="email"
                required
              />
              <label className="lblLogin" htmlFor="email">Email</label>
            </div>

            <div className="input-group">
              <input
                className="inputLogin"
                type="password"
                id="senha"
                required
              />
              <label className="lblLogin" htmlFor="senha">Senha</label>
            </div>

            <button type="submit" className="botaoLogin">Login</button>
          </form>

          <p className="lbl_CriarConta">
            Não tem uma conta? <a href="#">Criar agora!</a>
          </p>

          <p className="footer">&copy; 2025, 404 not found</p>
        </aside>
      </div>

    </div>
  );
}

export default Login;
