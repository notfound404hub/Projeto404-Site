import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function cadastroAlunoMentor(){

    const navigate = useNavigate()

    const irParaCadastro = () =>{
        navigate("/cadastroalunos")
    }

    return(
        <div>
            <input type="text" />

            <button className="acoes"
            onClick={irParaCadastro}
            >
            Próximo
            </button>

        </div>
        

    )
}

export default cadastroAlunoMentor
