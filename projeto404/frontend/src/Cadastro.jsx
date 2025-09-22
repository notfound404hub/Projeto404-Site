import { useState } from "react"
import axios from "axios"

function Register() {
    const [form, setForm] = useState({
        Aluno_Nome: "",
        Aluno_RA: "",
        Aluno_Email: "",
        Aluno_Senha: "",
        Aluno_CPF: "",
        Aluno_DDD: "",
        Aluno_Telefone: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Enviando form:", form) 
        try {
            const res = await axios.post("https://projeto404-site-backend.vercel.app/api/users/register", form)
            console.log("Resposta do backend:", res.data)
            alert(res.data.msg)
        }
        catch (err) {
            console.error("Erro no cadastro:", err.response?.data || err.message)
            alert("Erro no cadastro:" + (err.response?.data?.error || err.message))
        }
    }

    return (
        <div className="bodyImg">
            <aside className="asideCadastro">
                <img className="logoCadastro" src="./src/assets/logo.png" alt="logo" />
                <h1 className="h1Cadastro">Crie sua conta agora e impulsione lideranças empáticas</h1>

                <form className="formCadastro" onSubmit={handleSubmit}>
                    <div className="inputGroupRow">
                        <input 
                          type="text" 
                          name="Aluno_Nome" 
                          placeholder="Primeiro Nome*" 
                          className="inputCadastro"
                          onChange={handleChange}
                          required
                        />
                        <input 
                          type="text" 
                          name="Aluno_RA" 
                          placeholder="Matrícula*" 
                          className="inputCadastro"
                          onChange={handleChange}
                          required
                        />
                    </div>

                    <input 
                      type="email" 
                      name="Aluno_Email" 
                      placeholder="E-mail*" 
                      className="inputCadastro"
                      onChange={handleChange}
                      required
                    />

                    <input 
                      type="text" 
                      name="Aluno_CPF" 
                      placeholder="CPF ou CNPJ*" 
                      className="inputCadastro"
                      onChange={handleChange}
                      required
                    />

                    <div className="inputGroupRow">
                        <input 
                          type="text" 
                          name="Aluno_DDD" 
                          placeholder="DDD*" 
                          className="inputCadastro"
                          onChange={handleChange}
                          required
                        />
                        <input 
                          type="text" 
                          name="Aluno_Telefone" 
                          placeholder="Telefone*" 
                          className="inputCadastro"
                          onChange={handleChange}
                          required
                        />
                    </div>

                    <button type="submit" className="btnProximo">Próximo</button>
                </form>
            </aside>
        </div>
    )
}

export default Register
