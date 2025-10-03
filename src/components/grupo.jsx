import { useState, useEffect, useRef } from "react";

function Grupo() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  const grupos = [
    {
      id: "G001",
      nome: "Grupo Alpha",
      mentor: "Prof. Carlos",
      alunos: ["Breno Groba", "João Silva", "Maria Souza", "Pedro Santos", "Ana Lima", "Ricardo Alves", "Juliana Costa", "Lucas Pereira", "Fernanda Dias"],
    },
    {
      id: "G002",
      nome: "Grupo Beta",
      mentor: "Prof. João",
      alunos: ["André Silva", "Beatriz Santos", "Clara Mendes", "Diego Rocha", "Elisa Martins", "Fabio Ferreira", "Gabriela Souza", "Hugo Barbosa", "Isabela Costa"],
    },
    {
      id: "G003",
      nome: "Grupo Gama",
      mentor: "Prof. Fernanda",
      alunos: ["Caio Almeida", "Diana Prado", "Eduardo Ramos", "Felipe Lima", "Giovana Costa", "Henrique Silva", "Igor Martins", "Julia Rocha", "Karina Lopes"],
    },
    {
      id: "G004",
      nome: "Grupo Delta",
      mentor: "Prof. Ricardo",
      alunos: ["Laura Souza", "Marcelo Dias", "Nathalia Costa", "Otávio Lima", "Paula Rocha", "Rafael Nunes", "Sofia Mendes", "Thiago Almeida", "Vinicius Silva"],
    },
    {
      id: "G005",
      nome: "Grupo Epsilon",
      mentor: "Prof. Ana",
      alunos: ["Alex Rocha", "Bruna Souza", "Caio Nunes", "Daniela Costa", "Eduardo Lima", "Fernanda Alves", "Gabriel Mendes", "Helena Dias", "Isac Pereira"],
    },
    {
      id: "G006",
      nome: "Grupo Zeta",
      mentor: "Prof. Marcos",
      alunos: ["Joana Alves", "Kleber Rocha", "Larissa Silva", "Mateus Costa", "Nicolas Dias", "Olivia Rocha", "Pedro Mendes", "Quésia Lima", "Roberto Souza"],
    },
    {
      id: "G007",
      nome: "Grupo Eta",
      mentor: "Prof. Paula",
      alunos: ["Samara Rocha", "Tiago Lima", "Ursula Costa", "Victor Nunes", "William Souza", "Xuxa Pereira", "Yasmin Mendes", "Zeca Rocha", "Arthur Dias"],
    },
    {
      id: "G008",
      nome: "Grupo Theta",
      mentor: "Prof. Felipe",
      alunos: ["Alice Rocha", "Bruno Dias", "Carla Souza", "Diego Martins", "Ellen Rocha", "Fábio Silva", "Gustavo Costa", "Heloisa Rocha", "Isabela Nunes"],
    },
    {
      id: "G009",
      nome: "Grupo Iota",
      mentor: "Prof. Marina",
      alunos: ["João Pedro", "Karol Lima", "Luan Rocha", "Mariana Dias", "Nathalia Silva", "Otto Nunes", "Patrícia Rocha", "Quintino Costa", "Renata Souza"],
    },
    {
      id: "G010",
      nome: "Grupo Kappa",
      mentor: "Prof. Lucas",
      alunos: ["Sérgio Rocha", "Tatiane Dias", "Ulisses Costa", "Vanessa Lima", "Wellington Souza", "Xandão Nunes", "Yuri Mendes", "Zilda Rocha", "Alan Dias"],
    },
    {
      id: "G011",
      nome: "Grupo Lambda",
      mentor: "Prof. Roberto",
      alunos: ["Amanda Rocha", "Bianca Dias", "Carlos Souza", "Débora Nunes", "Elton Rocha", "Fernanda Costa", "Guilherme Mendes", "Hugo Lima", "Iara Silva"],
    },
    {
      id: "G012",
      nome: "Grupo Mu",
      mentor: "Prof. Juliana",
      alunos: ["Jonas Rocha", "Katia Dias", "Leonardo Silva", "Melissa Costa", "Natanael Nunes", "Olga Rocha", "Paulo Mendes", "Quitéria Souza", "Rodrigo Lima"],
    },
    {
      id: "G013",
      nome: "Grupo Nu",
      mentor: "Prof. Eduardo",
      alunos: ["Samantha Rocha", "Tobias Lima", "Ulysses Costa", "Valéria Souza", "Wesley Rocha", "Ximena Dias", "Yago Silva", "Zuleica Nunes", "Arthur Mendes"],
    },
    {
      id: "G014",
      nome: "Grupo Xi",
      mentor: "Prof. Bianca",
      alunos: ["Alexandre Rocha", "Brenda Dias", "Caue Souza", "Daniel Rocha", "Elisa Mendes", "Felipe Nunes", "Gabriela Silva", "Heloise Costa", "Igor Rocha"],
    },
    {
      id: "G015",
      nome: "Grupo Omicron",
      mentor: "Prof. Thiago",
      alunos: ["Jessica Rocha", "Kaique Lima", "Larissa Mendes", "Mateus Souza", "Nicole Rocha", "Oscar Silva", "Paula Dias", "Quirino Costa", "Rafaela Nunes"],
    },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === grupos.length) {
      setSelected([]);
    } else {
      setSelected(grupos.map((g) => g.id));
    }
  };

  const isAllSelected = selected.length === grupos.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < grupos.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, grupos.length]);

  return (
    <div className="main-container-tabela">
      {/* Cabeçalho com botões */}
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <button className="btn-tabela formulario-aluno">Formulário</button>
        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">Mais opções ▾</button>
          <div className="dropdown-content-tabela">
            <a href="#">Exportar grupos</a>
            <a href="#">Importar grupos</a>
            <a href="#">Excluir</a>
            <a href="#">Editar</a>
          </div>
        </div>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      {/* Indicador de grupos selecionados */}
      <p className="indicador-selecionados-tabela">
        {selected.length} grupo(s) selecionado(s)
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
              <th>Nome</th>
              <th>Mentor</th>
              <th>Aluno 1</th>
              <th>Aluno 2</th>
              <th>Aluno 3</th>
              <th>Aluno 4</th>
              <th>Aluno 5</th>
              <th>Aluno 6</th>
              <th>Aluno 7</th>
              <th>Aluno 8</th>
              <th>Aluno 9</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((grupo) => (
              <tr className="tr-aluno" key={grupo.id}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(grupo.id)}
                    onChange={() => toggleSelect(grupo.id)}
                  />
                </td>
                <td>{grupo.id}</td>
                <td>{grupo.nome}</td>
                <td>{grupo.mentor}</td>
                {grupo.alunos.map((aluno, index) => (
                  <td key={index}>{aluno}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grupo;
