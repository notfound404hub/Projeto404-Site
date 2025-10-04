import { useState, useEffect, useRef } from "react";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);   // vem da API
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  // Função para carregar os usuários da rota
  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/usuario"); // sua rota
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
        console.log("Usuários carregados:", data);
      } else {
        alert(data.error || "Erro ao buscar usuários");
      }
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      alert("Erro no servidor ao buscar usuário");
    }
  };

  // Carrega os usuários ao montar o componente
  useEffect(() => {
    carregarUsuarios();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === usuarios.length) {
      setSelected([]);
    } else {
      setSelected(usuarios.map((u) => u.ID_Usuario)); // campo do banco
    }
  };

  const isAllSelected = selected.length === usuarios.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial = selected.length > 0 && selected.length < usuarios.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, usuarios.length]);

  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      <p className="indicador-selecionados-tabela">
        {selected.length} usuário(s) selecionado(s)
      </p>

      <div className="tabela">
        <table className="tabela-container-tabela">
          <thead>
            <tr>
              <th>
                <input
                  className="chk-tabela"
                  type="checkbox"
                  ref={headerCheckboxRef}
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Usuário</th>
              <th>CPF/CNPJ</th>
              <th>Empresa</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Senha</th>
              <th>Criado em</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.ID_Usuario}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(u.ID_Usuario)}
                    onChange={() => toggleSelect(u.ID_Usuario)}
                  />
                </td>
                <td>{u.ID_Usuario}</td>
                <td>{u.Usuario_Nome}</td>
                <td>{u.Usuario_CPF}</td>
                <td>{u.Usuario_Empresa}</td>
                <td>{u.Usuario_Email}</td>
                <td>{u.Usuario_Telefone}</td>
                <td>{u.Usuario_Senha}</td>
                
                
                <td>{new Date(u.created_at).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuarios;
