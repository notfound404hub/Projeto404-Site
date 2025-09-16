import { useState } from 'react';

function Login() {
  return (
    <div className="divLogin">
      <aside className="asideLogin">
        <img className="logo" src= "./src/assets/logo.png"  alt="Logo" />

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
              placeholder=" " 
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group">
            <input
              className="inputLogin"
              type="password"
              id="senha"
              placeholder=" "
            />
            <label htmlFor="senha">Senha</label>
          </div>
        </form>

        <p className="lbl_CriarConta">
          Não tem uma conta? <a href="">Criar agora!</a>
        </p>

        <button className="botaoLogin">Login</button>

        <p className="footer">&copy; 2025, 404 not found</p>
      </aside>
    </div>
  );
}

export default Login;

