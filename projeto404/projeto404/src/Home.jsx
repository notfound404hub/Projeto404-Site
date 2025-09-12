import { useState } from "react";

function Home() {
  return(
    <div className="divHome">
        <img className="logoHome" src="./src/assets/logo.png" alt="" />
        <aside className="upHome">
            <button>Institucional</button>
            <button>Informações</button>
            <button>Notícias</button>
            <button>Contato</button>
            <button className="btnConectar">Conecte-se</button>
        </aside>
        <h1>Em breve 7° Edição</h1>
        <h1>Lideranças Empáticas</h1>
        <p>Educar é desenvolver competências</p>
    </div>

  )
}

export default Home;
