import { useState } from "react";


function CadastroColaborador() {
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    empresa: "",
    cpfCnpj: "",
    email: "",
    telefone: "",
    senha: "",
    confirmSenha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Usuário cadastrado com sucesso!");
        setFormData({
          id: "",
          nome: "",
          empresa: "",
          cpfCnpj: "",
          email: "",
          telefone: "",
          senha: "",
          confirmSenha: "",
        });
      } else {
        alert(data.error || "Erro ao cadastrar usuário");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err);
      alert("Erro no servidor ao cadastrar usuário");
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Colaborador</h2>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>ID</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
          <label>Nome</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          <label>Empresa</label>
          <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>CPF/CNPJ</label>
          <input type="text" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleChange} />
          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          <label>Telefone</label>
          <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Senha</label>
          <input type="password" name="senha" value={formData.senha} onChange={handleChange} />
          <label>Confirmação de senha</label>
          <input type="password" name="confirmSenha" value={formData.confirmSenha} onChange={handleChange} />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-confirmar">Confirmar Cadastro</button>
          <button type="button" className="btn-cancelar">Cancelar Cadastro</button>
        </div>
      </form>
    </div>
  );
}

export default CadastroColaborador;
