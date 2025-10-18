import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Usuarios({ onSelectPage }) {
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginais, setUsuariosOriginais] = useState([]); // 🔹 Guarda lista completa
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [fileName, setFileName] = useState("usuarios_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("intervalo");
  const headerCheckboxRef = useRef(null);
  const [valorSelecionado, setValorSelecionado] = useState("nome");

  // 🔹 Estados do sistema de filtros
  const [filtros, setFiltros] = useState([]);
  const [valorFiltro, setValorFiltro] = useState("");

  const opcoesNumericas = [
    { value: "igual", label: "é igual a" },
    { value: "maior", label: "é maior que" },
    { value: "menor", label: "é menor que" },
  ];

  const opcoesTextuais = [
    { value: "igual", label: "é igual a" },
    { value: "contem", label: "contém" },
    { value: "naoContem", label: "não contém" },
  ];

  const handleChange = (event) => {
    setValorSelecionado(event.target.value);
    if (event.target.value === "id") {
      setFilterSelecionado("igual");
    }
  };

  //  Carregar usuários
  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/usuarios");
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
        setUsuariosOriginais(data); // 🔹 Salva a lista original
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

  // 📌 Seleção
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

  //  Gerar planilha
  const gerarWorkbook = (dados) => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    return workbook;
  };

  // Exportar por intervalo
  const exportarUsuarios = () => {
    let dadosFiltrados = usuarios;

    if (exportType === "intervalo") {
      if (!rangeStart || !rangeEnd) {
        alert("Preencha o ID inicial e final!");
        return;
      }
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);
      dadosFiltrados = usuarios.filter(
        (u) => u.ID_Usuario >= start && u.ID_Usuario <= end
      );

      if (dadosFiltrados.length === 0) {
        alert("Nenhum usuário encontrado no range informado!");
        return;
      }
    }

    const workbook = gerarWorkbook(dadosFiltrados);
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, `${fileName}.xlsx`);
    setShowModal(false);
  };

  // Exportar escolhendo local
  const exportarEscolhendoLocal = async () => {
    let dadosFiltrados = usuarios;

    if (exportType === "intervalo") {
      if (!rangeStart || !rangeEnd) {
        alert("Preencha o ID inicial e final!");
        return;
      }
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);
      dadosFiltrados = usuarios.filter(
        (u) => u.ID_Usuario >= start && u.ID_Usuario <= end
      );
    }

    if (dadosFiltrados.length === 0) {
      alert("Nenhum usuário para exportar!");
      return;
    }

    const workbook = gerarWorkbook(dadosFiltrados);
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `${fileName}.xlsx`,
        types: [
          {
            description: "Planilha Excel",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
                ".xlsx",
              ],
            },
          },
        ],
      });

      const writable = await fileHandle.createWritable();
      await writable.write(excelBuffer);
      await writable.close();

      alert("Arquivo exportado com sucesso!");
      setShowModal(false);
    } catch (err) {
      console.warn("Exportação cancelada:", err);
      alert("Não foi possível salvar no local escolhido.");
    }
  };

  // Excluir usuários selecionados
  const excluirUsuarios = async () => {
    if (selected.length === 0) {
      alert("Nenhum usuário selecionado para exclusão!");
      return;
    }

    try {
      const response = await fetch("http://localhost:500/api/users/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selected }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.msg);
        setUsuarios((prev) =>
          prev.filter((u) => !selected.includes(u.ID_Usuario))
        );
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
          <button className="btn-tabela filtrar-tabela" onClick={() => setShowFilterModal(true)}>Filtrar</button>
          <button className="btn-tabela ordenar-tabela" onClick={() => setshowModalOrdenar(true)}>Ordenar</button>
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

      {/* Modal de Exportação */}
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

            {exportType === "intervalo" && (
              <label>
                Digite o ID inicial e o ID final:
                <div className="inputs-Exportar">
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
            )}

            <div className="export-options">
              <label className="radio-option">
                <input
                  type="radio"
                  name="exportType"
                  value="intervalo"
                  checked={exportType === "intervalo"}
                  onChange={() => setExportType("intervalo")}
                />
                Exportar por intervalo de IDs
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="exportType"
                  value="todos"
                  checked={exportType === "todos"}
                  onChange={() => setExportType("todos")}
                />
                Exportar todos os usuários
              </label>
            </div>

            <div className="modal-actions">
              <button onClick={exportarUsuarios} className="botaoLogin">
                Exportar
              </button>
              <button onClick={() => setShowModal(false)} className="botaoLogin">
                Cancelar
              </button>
              <button
                onClick={exportarEscolhendoLocal}
                className="botaoLogin teste"
              >
                Escolher local
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Filtro */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Filtrar Usuários</h2>
            <p>Adicionar novo filtro:</p>

            <div className="sectionfilter">
              <select
                name="selectFilter"
                value={valorSelecionado}
                onChange={handleChange}
              >
                <option value="Usuario_Nome">Nome</option>
                <option value="ID_Usuario">ID do usuário</option>
                <option value="Usuario_CPF">CPF</option>
                <option value="Usuario_Empresa">Empresa</option>
                <option value="Usuario_Email">Email</option>
                <option value="Usuario_Telefone">Telefone</option>
                <option value="created_at">Data de criação</option>
              </select>

              <select
                value={filterSelecionado}
                onChange={(e) => setFilterSelecionado(e.target.value)}
              >
                {(valorSelecionado === "ID_Usuario"
                  ? opcoesNumericas
                  : opcoesTextuais
                ).map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Digite o valor..."
                value={valorFiltro}
                onChange={(e) => setValorFiltro(e.target.value)}
              />

              <button
                className="btnFilter"
                onClick={() => {
                  if (!valorFiltro.trim()) return alert("Digite um valor!");
                  const novoFiltro = {
                    campo: valorSelecionado,
                    condicao: filterSelecionado,
                    valor: valorFiltro.trim(),
                  };
                  setFiltros((prev) => [...prev, novoFiltro]);
                  setValorFiltro("");
                }}
              >
                Adicionar
              </button>
            </div>

            {/* Lista de filtros adicionados */}
            {filtros.length > 0 && (
              <div className="lista-filtros">
                <h4>Filtros adicionados:</h4>
                {filtros.map((f, i) => (
                  <div key={i} className="filtro-item">
                    <span>
                      {f.campo.replace("Usuario_", "")} {f.condicao} "{f.valor}"
                    </span>
                    <button
                      className="btnRemoverFiltro"
                      onClick={() =>
                        setFiltros((prev) => prev.filter((_, idx) => idx !== i))
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="footerModal">
              <button
                className="btnFilter"
                onClick={() => {
                  let filtrados = [...usuariosOriginais];
                  filtros.forEach((f) => {
                    filtrados = filtrados.filter((u) => {
                      const val = String(u[f.campo]).toLowerCase();
                      const comp = f.valor.toLowerCase();

                      if (f.condicao === "igual") return val === comp;
                      if (f.condicao === "contem") return val.includes(comp);
                      if (f.condicao === "naoContem")
                        return !val.includes(comp);
                      if (f.condicao === "maior")
                        return parseFloat(val) > parseFloat(comp);
                      if (f.condicao === "menor")
                        return parseFloat(val) < parseFloat(comp);
                      return true;
                    });
                  });
                  setUsuarios(filtrados);
                  setShowFilterModal(false);
                }}
              >
                Aplicar Filtros
              </button>

              <button
                className="btnFilter"
                onClick={() => {
                  setUsuarios(usuariosOriginais);
                  setFiltros([]);
                  setShowFilterModal(false);
                }}
              >
                Limpar Filtros
              </button>

              <button
                className="btnFilter"
                onClick={() => setShowFilterModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Ordenação */}
      {showModalOrdenar && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Ordenar Usuários</h2>

            <div className="sectionfilter">
              <select
                onChange={(e) => setValorSelecionado(e.target.value)}
                value={valorSelecionado}
              >
                <option value="ID_Usuario">ID do usuário</option>
                <option value="Usuario_Nome">Nome</option>
                <option value="Usuario_CPF">CPF</option>
                <option value="Usuario_Empresa">Empresa</option>
                <option value="Usuario_Email">Email</option>
                <option value="Usuario_Telefone">Telefone</option>
                <option value="created_at">Data de criação</option>
              </select>

              <select
                onChange={(e) => setFilterSelecionado(e.target.value)}
                value={filterSelecionado}
              >
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>

            <div className="footerModal">
              <button
                className="btnFilter"
                onClick={() => {
                  const ordenado = [...usuarios].sort((a, b) => {
                    const campo = valorSelecionado;
                    if (filterSelecionado === "asc") {
                      return a[campo] > b[campo] ? 1 : -1;
                    } else {
                      return a[campo] < b[campo] ? 1 : -1;
                    }
                  });
                  setUsuarios(ordenado);
                  setshowModalOrdenar(false);
                }}
              >
                Ordenar
              </button>
              <button
                className="btnFilter"
                onClick={() => setshowModalOrdenar(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Excluir */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar exclusão</h2>
            <p>Deseja realmente excluir os usuários selecionados?</p>

            <div className="footerModal">
              <button className="btnFilter" onClick={excluirUsuarios}>
                Confirmar
              </button>
              <button
                className="btnFilter"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;
