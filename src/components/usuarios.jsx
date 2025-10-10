import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Usuarios({ onSelectPage }) {
  const [usuarios, setUsuarios] = useState([]); 
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false); // exportação
  const [showDeleteModal, setShowDeleteModal] = useState(false); // exclusão
  const [fileName, setFileName] = useState("usuarios_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const headerCheckboxRef = useRef(null);
  
  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/usuarios"); 
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
      } else {
        alert(data.error || "Erro ao buscar usuários");
      }
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      alert("Erro no servidor ao buscar usuário");
    }
  };

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
      setSelected(usuarios.map((u) => u.ID_Usuario));
    }
  };

  const isAllSelected = selected.length === usuarios.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < usuarios.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, usuarios.length]);

  // 📌 Exporta com base no range
  const gerarWorkbook = () => {
    let dadosFiltrados = usuarios;

    if (rangeStart && rangeEnd) {
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);

      dadosFiltrados = usuarios.filter(
        (u) => u.ID_Usuario >= start && u.ID_Usuario <= end
      );
    }

    if (dadosFiltrados.length === 0) {
      alert("Nenhum usuário encontrado no range informado!");
      return null;
    }

    const worksheet = XLSX.utils.json_to_sheet(dadosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");

    return workbook;
  };

  const exportarUsuarios = () => {
    const workbook = gerarWorkbook();
    if (!workbook) return;

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, `${fileName}.xlsx`);
    setShowModal(false);
  };

  // 📌 Exportar escolhendo o local
  const exportarEscolhendoLocal = async () => {
    const workbook = gerarWorkbook();
    if (!workbook) return;

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    try {
      // API moderna
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `${fileName}.xlsx`,
        types: [
          {
            description: "Planilha Excel",
            accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"] },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(excelBuffer);
      await writable.close();

      alert("Arquivo exportado com sucesso!");
      setShowModal(false);
    } catch (err) {
      console.warn("Exportação cancelada ou não suportada:", err);
      alert("Não foi possível salvar no local escolhido. Use o exportar normal.");
    }
  };

  // 📌 Excluir usuários selecionados (API)
  const excluirUsuarios = async () => {
    if (selected.length === 0) {
      alert("Nenhum usuário selecionado para exclusão!");
      return;
    }

    try {
      const response = await fetch("http://localhost:500/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected }), // envia array de IDs
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg);
        setUsuarios((prev) => prev.filter((u) => !selected.includes(u.ID_Usuario)));
        setSelected([]);
        setShowDeleteModal(false);
      } else {
        alert(data.error || "Erro ao excluir usuários!");
      }
    } catch (err) {
      console.error("Erro ao excluir usuários:", err);
      alert("Erro no servidor ao excluir usuários");
    }
  };

  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button
          className="btn-tabela adicionar-tabela"
          onClick={() => onSelectPage("CadastroUsuario")}
        >
          Adicionar +
        </button>
        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">Mais opções ▾</button>
          <div className="dropdown-content-tabela">
            <a onClick={() => setShowModal(true)}>Exportar usuários</a>
            <a href="#">Importar alunos</a>
            <a onClick={() => setShowDeleteModal(true)}>Excluir</a>
            <a href="#">Editar</a>
          </div>
        </div>
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
                    className="chk-tabela testechk"
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
                <td>
                  {new Date(u.created_at).toLocaleDateString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📌 Modal de exportação */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Exportar Usuários</h2>
            <label>
              Nome do arquivo:
              <input
              className="inpNomeArquivo"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </label>
            <label>
              Digite o ID inicial e o ID final:
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                className="inpRange"
                  type="number"
                  placeholder="Início"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                />
                <input
                className="inpRange"
                  type="number"
                  placeholder="Fim"
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                />
              </div>
            </label>
            <div className="modal-actions">
              <button onClick={exportarUsuarios} className="botaoLogin">Exportar</button>
              
              <button onClick={() => setShowModal(false)} className="botaoLogin">Cancelar</button>
              <button onClick={exportarEscolhendoLocal} className="botaoLogin teste" >Escolher local</button>
            </div>
          </div>
        </div>
      )}

      {/* 📌 Modal de exclusão */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Exclusão de Usuário</h2>
            <p>Você deseja excluir <b>{selected.length}</b> usuário(s)?</p>
            <div className="modal-actions">
              <button onClick={excluirUsuarios} className="botaoLogin">Confirmar</button>
              <button onClick={() => setShowDeleteModal(false)} className="botaoLogin">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;
