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
                <img className="iconPesquisa" src="search.png" alt="pesquisa" />
            </button>

            </div>

            <div className="divDireita">

            
            <button className="btnNotif">

            <img className="btnDivDireita" src="notification.png" alt="notif" />
            
            </button>
            
            <button className="btnChat">

            <img className="btnDivDireita" src="bubble-chat.png" alt="chat" />

            </button>
            
            <button className="btnPerfil">
            
            <img className="btnDivDireita" src="user.png" alt="user" />

            </button>  

            </div>



            </div>




        </header>
        
        <aside className="asideAdmin">
            
            <img className="logoAdmin" src="LogoFundoBranco.avif" alt="logo" />
            <button  className="btnAdmin">
                <img className="icon" src="home.png" alt="home" />
                Página inicial
                </button>
            <button className="btnAdmin">
                <img className="icon" src="report.png" alt="relatorio" />
                Relatórios
                </button>
            <button className="btnAdmin">
                <img className="icon" src="verify.png" alt="cadastros" />
                Cadastros
                </button>
            <button className="btnAdmin">
                <img className="icon" src="heart.png" alt="doacoes" />
                Doações
                </button>
            <button className="btnAdmin">
                <img className="icon" src="restaurant.png" alt="alimentos" />
                Alimentos
                </button>
            <button className="btnAdmin">
                <img className="icon" src="dollar.png" alt="dinheiro" />
                Dinheiro
                </button>
            <button className="btnAdmin">
                <img className="icon" src="graduation.png" alt="usuarios" />
                Usuários
                </button>
            <button className="btnAdmin">
                <img className="icon" src="administrator.png" alt="administrativo" />
                Administrativo
                </button>
            <button className="btnAdmin">
                <img className="icon" src="suport.png" alt="suporte" />
                Suporte
                </button>
            <button className="btnConfig">
                <img className="icon" src="setting.png" alt="config" />
                Configurações 
                </button>
            <button className="btnSair">
                <img className="icon" src="logout.png" alt="sair" />
                Sair
                </button>

        </aside>

        </body>

    )
}

export default Admin;