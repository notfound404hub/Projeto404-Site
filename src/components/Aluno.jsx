import { useState } from "react";


function Aluno() {
  const [selected, setSelected] = useState([]);

  const alunos = [
    {
      id: "0001",
      ra: "22101923",
      nome: "Bruno Gralco",
      turma: "2",
      turno: "Noturno",
      curso: "Ciência da computação",
      cargo: "Aluno",
      grupo: "404",
      id_grupo: "001",
    },
    {
      id: "0002",
      ra: "22101929",
      nome: "Bruno Gralco",
      turma: "2",
      turno: "Noturno",
      curso: "Ciência da computação",
      cargo: "Aluno",
      grupo: "404",
      id_grupo: "001",
    },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="main-container-aluno">
      {/* Cabeçalho com botões */}


      <div className="cabecalho-aluno">
        
      <button className="btn-aluno adicionar-aluno">Adicionar +</button>
        <button className="btn-aluno formulario-aluno">Formulário</button>
        <div className="dropdown-aluno">
          <button className="btn-aluno mais-opcoes">Mais opções ▾</button>
          <div className="dropdown-content-aluno">
            <a href="#">Exportar alunos</a>
            <a href="#">Importar alunos</a>
            <a href="#">Excluir</a>
          </div>
        </div>

        <button className="btn-aluno filtrar-aluno">Filtrar</button>
        <button className="btn-aluno ordenar-aluno">Ordenar</button>
      </div>

      {/* Indicador de selecionados */}
      {selected.length > 0 && (
        <p className="indicador-selecionados">
          {selected.length} aluno(s) selecionado(s)
        </p>
      )}

      {/* Tabela */}
      <table className="tabela-alunos" >
        <thead >
          <tr >
            <th></th>
            <th>ID</th>
            <th>RA</th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Turno</th>
            <th>Curso</th>
            <th>Cargo</th>
            <th>Grupo</th>
            <th>ID_Grupo</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(aluno.id)}
                  onChange={() => toggleSelect(aluno.id)}
                />
              </td>
              <td>{aluno.id}</td>
              <td>{aluno.ra}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.turma}</td>
              <td>{aluno.turno}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.cargo}</td>
              <td>{aluno.grupo}</td>
              <td>{aluno.id_grupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Aluno;
