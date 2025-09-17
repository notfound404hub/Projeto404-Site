import{useState} from "react"

function Admin(){
    return(
        <div>

        <header>
            <input type="text" 
            id="pesquisa"
            placeholder="Pesquisar "

            />
            <button className="btnPesquisa"></button>
            <button className="btnNotif"></button>
            <button className="btnChat"></button>
            <button className="btnPerfil"></button>  

        </header>
        
        <aside>
            <img className="logoAdmin" src="./src/assets/LogoFundoBranco.avif" alt="logo" />
            <button  className="btnAdmin">
                <img className="icon" src="./src/assets/home.png" alt="home" />
                Página inicial
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/report.png" alt="relatorio" />
                Relatórios
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/verify.png" alt="cadastros" />
                Cadastros
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/heart.png" alt="doacoes" />
                Doações
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/restaurant.png" alt="alimentos" />
                Alimentos
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/dollar.png" alt="dinheiro" />
                Dinheiro
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/graduation.png" alt="usuarios" />
                Usuários
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/copy-writing.png" alt="conteudo" />
                Conteúdo
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/administrator.png" alt="administrativo" />
                Administrativo
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/suport.png" alt="suporte" />
                Suporte
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/budget.png" alt="financeiro" />
                Financeiro
                </button>
            <button className="btnAdmin">
                <img className="" src="./src/assets/setting.png" alt="config" />
                Configurações 
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/logout.png" alt="sair" />
                Sair
                </button>


        </aside>

        </div>

    )
}

export default Admin;