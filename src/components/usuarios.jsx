import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { data } from "react-router-dom";
import api from "../api.js"


function Usuarios({ onSelectPage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginais, setUsuariosOriginais] = useState([]); 
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [fileName, setFileName] = useState("usuarios_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("Todos");
  const headerCheckboxRef = useRef(null);
  const [valorSelecionado, setValorSelecionado] = useState("ID_Usuario");
  const [showEditModal, setShowEditModal] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const [filtros, setFiltros] = useState([]);
  filtros[0] = "Usuários";
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
  const abrirModalEdicao = async () => {
    if (selected.length !== 1) {
      alert("Selecione exatamente 1 usuário para editar!");
      return;
    }

    const id = selected[0];

    try {
      const response = await api.get(
        `/usuario/${id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar usuário");

      const data = await response.json();
      setUsuarioEdit(data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      alert("Erro ao buscar dados do usuário");
    }
  };

  const carregarUsuarios = async () => {
    try {
      const response = await api.get("/usuarios");
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data);
        setUsuariosOriginais(data); 
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


  const gerarWorkbook = (dados) => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    return workbook;
  };

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
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(data, `${fileName}.xlsx`);
    setShowModal(false);
  };

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
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `${fileName}.xlsx`,
        types: [
          {
            description: "Planilha Excel",
            accept: {
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
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

  const handleExportarUsuarios = async () => {
    try {
      console.log("🧾 Iniciando exportação de todos os usuários...");

      setExportType("Todos");
      
      await exportarUsuarios();

      console.log("✅ Planilha exportada com sucesso!");
      alert("✅ Planilha exportada com sucesso!");
    } catch (erro) {
      console.error("❌ Erro ao exportar usuários:", erro);
      alert("Erro ao exportar planilha");
    }
  };

  const excluirUsuarios = async () => {
    if (selected.length === 0) {
      alert("Nenhum usuário selecionado para exclusão!");
      return;
    }

    try {
      const response = await api.delete("/deleteFromTable", {
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
      carregarUsuarios()
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
          <button className="btn-tabela mais-opcoes-tabela">
            Mais opções ▾
          </button>
          <div className="dropdown-content-tabela">
            <a onClick={() => setShowModal(true)}>Exportar usuários</a>
            <a onClick={() => setShowImportModal(true)}>Importar usuários</a>

            <a onClick={() => setShowDeleteModal(true)}>Excluir</a>
            <a onClick={abrirModalEdicao}>Editar</a>
          </div>
        </div>

        <div className="rightMenu-tabela">
          <button
            className="btn-tabela filtrar-tabela"
            onClick={() => setShowFilterModal(true)}
          >
            Filtrar
          </button>
          <button
            className="btn-tabela ordenar-tabela"
            onClick={() => setshowModalOrdenar(true)}
          >
            Ordenar
          </button>
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
              <button
                onClick={() => setShowModal(false)}
                className="botaoLogin"
              >
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
                {filtros
                  .filter((f) => f && f.campo)
                  .map((f, i) => (
                    <div key={i} className="filtro-item">
                      <span>
                        {(f.campo || "").replace("Usuario_", "")} {f.condicao} "
                        {f.valor}"
                      </span>
                      <button
                        className="btnRemoverFiltro"
                        onClick={() =>
                          setFiltros((prev) =>
                            prev.filter((_, idx) => idx !== i)
                          )
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
                onClick={async () => {
                  try {
                    const response = await api.post(
                      "/filtrar",
                      {                        
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ filtros }),
                      }
                    );

                    if (!response.ok) {
                      throw new Error("Erro ao buscar dados do servidor");
                    }

                    const data = await response.json();
                    setUsuarios(data);
                    setShowFilterModal(false);
                  } catch (error) {
                    console.error("Erro ao aplicar filtros:", error);
                    alert(
                      "Erro ao aplicar filtros. Veja o console para detalhes."
                    );
                  }
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
                onClick={async () => {
                  try {
                    const body = {
                      campo: valorSelecionado,
                      direcao: filterSelecionado, 
                    };

                    const response = await api.post(
                      "/ordenar",
                      {        
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                      }
                    );

                    if (!response.ok) {
                      throw new Error("Erro ao buscar dados do servidor");
                    }

                    const data = await response.json();
                    setUsuarios(data);
                    setshowModalOrdenar(false);
                  } catch (error) {
                    console.error("Erro ao aplicar ordenação:", error);
                    alert(
                      "Erro ao aplicar ordenação. Veja o console para detalhes."
                    );
                  }
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

      {/* 🔹 Modal de Edição */}
      {showEditModal && usuarioEdit && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Usuário</h2>

            <div className="formEdit">
              <label>ID:</label>
              <input type="text" value={usuarioEdit.ID_Usuario} readOnly />

              <label>Nome:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_Nome || ""}
                onChange={(e) =>
                  setUsuarioEdit({
                    ...usuarioEdit,
                    Usuario_Nome: e.target.value,
                  })
                }
              />

              <label>CPF/CNPJ:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_CPF || ""}
                readOnly
              />

              <label>Empresa:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_Empresa || ""}
                onChange={(e) =>
                  setUsuarioEdit({
                    ...usuarioEdit,
                    Usuario_Empresa: e.target.value,
                  })
                }
              />

              <label>Email:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_Email || ""}
                readOnly
              />

              <label>Telefone:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_Telefone || ""}
                onChange={(e) =>
                  setUsuarioEdit({
                    ...usuarioEdit,
                    Usuario_Telefone: e.target.value,
                  })
                }
              />

              <label>Senha:</label>
              <input
                type="text"
                value={usuarioEdit.Usuario_Senha || ""}
                onChange={(e) =>
                  setUsuarioEdit({
                    ...usuarioEdit,
                    Usuario_Senha: e.target.value,
                  })
                }
              />

              <label>Criado em:</label>
              <input
                type="text"
                value={
                  new Date(usuarioEdit.created_at).toLocaleDateString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  }) || ""
                }
                readOnly
              />
            </div>

            <div className="footerModal">
              <button
                className="btnFilter"
                onClick={() => setShowEditModal(false)}
              >
                Fechar
              </button>

              <button
                className="btnFilter"
                onClick={async () => {
                  try {
                    const response = await api.put(
                      `/usuario/${usuarioEdit.ID_Usuario}`,
                      {
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          Usuario_Nome: usuarioEdit.Usuario_Nome,
                          Usuario_Empresa: usuarioEdit.Usuario_Empresa,
                          Usuario_Telefone: usuarioEdit.Usuario_Telefone,
                          Usuario_Senha: usuarioEdit.Usuario_Senha,
                        }),
                      }
                    );

                    let data = {};
                    try {
                      data = await response.json();
                    } catch (e) {
                      console.warn(
                        " Resposta sem corpo JSON, ignorando parse:",
                        e
                      );
                    }

                    if (!response.ok) {
                      alert(data.error || "Erro ao atualizar usuário");
                      return;
                    }

                    alert(" Usuário atualizado com sucesso!");
                    setShowEditModal(false);
                    carregarUsuarios();
                  } catch (error) {
                    console.error("Erro no update:", error);
                    alert("Erro no servidor ao atualizar usuário");
                  }
                }}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Importação */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Importar Usuários</h2>
            <p>
              Baixe o molde abaixo, preencha as informações e envie a planilha
              para importar os usuários.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <button className="export botaoLogin" onClick={handleExportarUsuarios}>
                Baixar molde (todos usuários)
              </button>

              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>

            <div className="footerModal">
              <button
                className="btnFilter"
                onClick={() => setShowImportModal(false)}
              >
                Fechar
              </button>

              <button
                className="btnFilter"
                onClick={async () => {
                  if (!selectedFile) {
                    alert("Selecione um arquivo primeiro!");
                    return;
                  }

                  const formData = new FormData();
                  formData.append("file", selectedFile);

                  try {
                    console.log("📤 Enviando arquivo Excel para o backend...");
                    const response = await api.post(
                      "/importarUsuarios",
                      {
                        body: formData,
                      } 
                    );

                    const data = await response.json();

                    if (!response.ok) {
                      throw new Error(
                        data.error || "Erro ao importar planilha"
                      );
                    }

                    alert(`${data.msg}`);
                    console.log("Detalhes:", data);
                    setShowImportModal(false);
                  carregarUsuarios()
                  } catch (error) {
                    console.error("Erro no envio da planilha:", error);
                    alert("Erro ao importar planilha");
                  }
                }}
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Usuarios;
