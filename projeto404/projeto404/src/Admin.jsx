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
            <img className="logoAdmin" src="./src/assets/logo.png" alt="logo" />
            <button className="btnHome">Página inicial</button>
            <button className="btnRelatorio">Relatórios</button>
            <button className="btnCadastros">Cadastros</button>
            <button className="btnDoacoes">Doações</button>
            <button className="btnAlimentos">Alimentos</button>
            <button className="btnDinheiro">Dinheiro</button>
            <button className="btnUsuarios">Usuários</button>
            <button className="btnConteudo">Conteúdo</button>
            <button className="btnAdministrativo">Administrativo</button>
            <button className="btnSuporte">Suporte</button>
            <button className="btnFinanceiro">Financeiro</button>
            <button className="btnConfig">Configurações </button>
            <button className="btnSair"></button>


        </aside>

        </div>

    )
}

export default Admin;