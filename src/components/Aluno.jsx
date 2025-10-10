import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Aluno() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  const alunos = [
    { id: "0001", ra: "22011010", nome: "Breno Groba", email: "brenogroba@gmail.com", senha: "12345", cpf: "49027706875", foto: "breno.png", telefone: "11970691099", grupo: "404 NOT found", Turma: "2NACCOMP" },
    { id: "0002", ra: "22011029", nome: "Outro Aluno", email: "teste@gmail.com", senha: "12345", cpf: "49027706875", foto: "teste.png", telefone: "11970691099", grupo: "Grupo X", Turma: "2NACCOMP" },
    { id: "0003", ra: "22011029", nome: "Breno Groba", email: "brenogroba@gmail.com", senha: "12345", cpf: "49027706875", foto: "breno.png", telefone: "11970691099", grupo: "404 NOT found", Turma: "2NACCOMP" },
    { id: "0004", ra: "22011029", nome: "Breno Groba", email: "brenogroba@gmail.com", senha: "12345", cpf: "49027706875", foto: "breno.png", telefone: "11970691099", grupo: "404 NOT found", Turma: "2NACCOMP" }
   
    // ... resto da lista
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

  // Aplica o estado indeterminado no checkbox do cabeçalho
  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial = selected.length > 0 && selected.length < alunos.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, alunos.length]);

  // 📌 Função para exportar
  const exportarAlunos = () => {
    // Filtra só os alunos que estão nos selected
    const alunosSelecionados = alunos.filter((a) => selected.includes(a.id));

    if (alunosSelecionados.length === 0) {
      alert("Nenhum aluno selecionado para exportar!");
      return;
    }

    // Cria a planilha a partir do JSON
    const worksheet = XLSX.utils.json_to_sheet(alunosSelecionados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Alunos");

    // Converte para array buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Baixa o arquivo
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "alunos_selecionados.xlsx");
  };

  return (
    <div className="main-container-tabela">
      {/* Cabeçalho com botões */}
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <button className="btn-tabela adicionar-tabela">Formulário</button>
        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">Mais opções ▾</button>
          <div className="dropdown-content-tabela">
            <a onClick={exportarAlunos}>Exportar alunos</a> {/* ⬅ aqui */}
            <a href="#">Importar alunos</a>
            <a href="#">Excluir</a>
            <a href="#">Editar</a>
          </div>
        </div>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      {/* Indicador de alunos selecionados */}
      <p className="indicador-selecionados-tabela">
        {selected.length} aluno(s) selecionado(s)
      </p>

      <div className="tabela">
        <div className="tabela-alunos">
          <table className="tabela-container-tabela ">
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
                <th>RA</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Senha</th>
                <th>CPF</th>
                <th>Foto</th>
                <th>Telefone</th>
                <th>Grupo</th>
                <th>Turma</th>
              </tr>
            </thead>

            <tbody>
              {alunos.map((aluno) => (
                <tr className="tr-aluno" key={aluno.id}>
                  <td>
                    <input
                      className="chk-tabela"
                      type="checkbox"
                      checked={selected.includes(aluno.id)}
                      onChange={() => toggleSelect(aluno.id)}
                    />
                  </td>
                  <td>{aluno.id}</td>
                  <td>{aluno.ra}</td>
                  <td>{aluno.nome}</td>
                  <td>{aluno.email}</td>
                  <td>{aluno.senha}</td>
                  <td>{aluno.cpf}</td>
                  <td>{aluno.foto}</td>
                  <td>{aluno.telefone}</td>
                  <td>{aluno.grupo}</td>
                  <td>{aluno.Turma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Aluno;
