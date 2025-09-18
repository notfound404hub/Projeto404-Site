import{useState} from "react"

function Admin(){
    return(
        <body className="bodyAdmin">

        <header className="headerAdmin">
            <div className="linha"></div>
            
            <div className="divPesquisar">

            
            <div className="divEsquerda">

            <input className="inputAdmin" 
            type="text" 
            id="pesquisa"
            placeholder="Pesquisar "
            />
            <button className="btnPesquisa">
                <img className="iconPesquisa" src="./src/assets/search.png" alt="pesquisa" />
            </button>

            </div>

            <div className="divDireita">

            
            <button className="btnNotif">

            <img className="btnDivDireita" src="./src/assets/notification.png" alt="notif" />
            
            </button>
            
            <button className="btnChat">

            <img className="btnDivDireita" src="./src/assets/bubble-chat.png" alt="chat" />

            </button>
            
            <button className="btnPerfil">
            
            <img className="btnDivDireita" src="./src/assets/user.png" alt="user" />

            </button>  

            </div>



            </div>




        </header>
        
        <aside className="asideAdmin">
            
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
                <img className="icon" src="./src/assets/administrator.png" alt="administrativo" />
                Administrativo
                </button>
            <button className="btnAdmin">
                <img className="icon" src="./src/assets/suport.png" alt="suporte" />
                Suporte
                </button>
            <button className="btnConfig">
                <img className="icon" src="./src/assets/setting.png" alt="config" />
                Configurações 
                </button>
            <button className="btnSair">
                <img className="icon" src="./src/assets/logout.png" alt="sair" />
                Sair
                </button>

        </aside>

        </body>

    )
}

export default Admin;