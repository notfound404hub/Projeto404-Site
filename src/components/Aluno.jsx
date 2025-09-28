import { useState, useEffect, useRef } from "react";

function Aluno() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

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

  // Alterna a seleção de um único aluno
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Alterna a seleção de todos os alunos
  const toggleSelectAll = () => {
    if (selected.length === alunos.length) {
      setSelected([]);
    } else {
      setSelected(alunos.map((a) => a.id));
    }
  };

  // Verifica se todos os alunos estão selecionados
  const isAllSelected = selected.length === alunos.length;

  // Aplica o estado visual "indeterminado" no checkbox do cabeçalho
  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < alunos.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, alunos.length]);

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
            <a href="#">Editar</a>
          </div>
        </div>
        <button className="btn-aluno filtrar-aluno">Filtrar</button>
        <button className="btn-aluno ordenar-aluno">Ordenar</button>
      </div>

      {/* Indicador de alunos selecionados */}
      
        <p className="indicador-selecionados">
          {selected.length} aluno(s) selecionado(s)
        </p>
    

      {/* Tabela de alunos */}
      <table className="tabela-alunos">
        <thead>
          <tr>
            <th>
              <input
                className="chkalunos"
                type="checkbox"
                ref={headerCheckboxRef}
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
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
                    className="chkalunos"
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
