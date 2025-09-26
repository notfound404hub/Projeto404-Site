
import "../index.css";

function Aluno() {
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

      {/* Tabela apenas com cabeçalho */}
      <table className="tabela-alunos">
        <thead>
          <tr>
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
          {/* Vazio por enquanto */}
        </tbody>
      </table>
    </div>
  );
}

export default Aluno;
