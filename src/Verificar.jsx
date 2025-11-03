import{useState} from "react"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Verificar(){ 

    const[email, setEmail] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:500/api/users/verificar",
                {email}
             )
             console.log("Requisição recebida", res)

             console.log("Resposta do backend", res.data)

             if(verifyToken){
                navigate("/admin")
             }
        }catch(err){

        }
        
    }

    return(
        <div className="divVerificar">
            
        <aside className="asideVerificar">
            <img className="logoVerificar" src="LogoFundoBranco.avif" alt="logo" />
            <h1 className="h1VerificarEmail">Verificação de E-mail</h1>
            <p className="pVerificar">Não recebeu? <a href=""> Reenviar código</a></p>
            <h1 className="h1Verificar">Clique no botão abaixo para verificar seu E-mail. Um código será enviado para o seu e-mail logo após.
            Verifique sua caixa de e-mail e entre na sua conta! (Confira a caixa de spam ou a lixeira.)</h1>

            <button type = "submit" className="btnVerificar">Verificar</button>

        </aside>
        
        </div>
        

    )
}

export default Verificar;