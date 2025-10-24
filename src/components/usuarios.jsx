import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { data } from "react-router-dom";

// 🔹 Imports dos modais
import ImportModal from "./modal/importarModal.jsx";
import ExportarModal from "./modal/exportarModal.jsx";
import FiltroModal from "./modal/FilterModal.jsx";
import OrdenarModal from "./modal/ordenarModal.jsx";
import ExcluirModal from "./modal/excluirModal.jsx";
import EditarModal from "./modal/editarModal.jsx";

function Usuarios({ onSelectPage }) {
  // Estados principais
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginais, setUsuariosOriginais] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("usuarios_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("Todos");
  const [valorSelecionado, setValorSelecionado] = useState("ID_Usuario");
  const [valorFiltro, setValorFiltro] = useState("");
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [filtros, setFiltros] = useState([]);
  const headerCheckboxRef = useRef(null);

  // Controle dos modais
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  filtros[0] = "Usuários";

  // Opções dos filtros
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

  // Manipulação de filtros
  const handleChange = (event) => {
    setValorSelecionado(event.target.value);
    if (event.target.value === "id") setFilterSelecionado("igual");
  };

  // Função: carregar usuários
  const carregarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/usuarios");
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

  // Seleção de usuários
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

  // Exportação
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

  const handleExportarUsuarios = async () => {
    try {
      console.log("🧾 Iniciando exportação de todos os usuários...");
      setExportType("Todos");
      await exportarUsuarios();
      alert("✅ Planilha exportada com sucesso!");
    } catch (erro) {
      console.error("❌ Erro ao exportar usuários:", erro);
      alert("Erro ao exportar planilha");
    }
  };

  // Exclusão de usuários
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
      carregarUsuarios();
    } catch (err) {
      console.error("Erro ao excluir usuários:", err);
      alert("Erro no servidor ao excluir usuários");
    }
  };

  // Abrir modal de edição
  const abrirModalEdicao = async () => {
    if (selected.length !== 1) {
      alert("Selecione exatamente 1 usuário para editar!");
      return;
    }

    const id = selected[0];
    try {
      const response = await fetch(
        `http://localhost:500/api/users/usuario/${id}`
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

  // 🔹 JSX
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

      {/* 🔹 Modais importados e controlados por estado */}
      <ExportarModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        exportType={exportType}
        setExportType={setExportType}
        fileName={fileName}
        setFileName={setFileName}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        setRangeStart={setRangeStart}
        setRangeEnd={setRangeEnd}
        exportarUsuarios={exportarUsuarios}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={carregarUsuarios}
        handleExportarUsuarios={handleExportarUsuarios}
      />

      <ExcluirModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={excluirUsuarios}
      />
      <FiltroModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filtros={filtros}
        setFiltros={setFiltros}
        valorSelecionado={valorSelecionado}
        setValorSelecionado={setValorSelecionado}
        filterSelecionado={filterSelecionado}
        setFilterSelecionado={setFilterSelecionado}
        valorFiltro={valorFiltro}
        setValorFiltro={setValorFiltro}
        opcoesNumericas={opcoesNumericas}
        opcoesTextuais={opcoesTextuais}
        usuariosOriginais={usuariosOriginais}
        setUsuarios={setUsuarios}
      />

      <OrdenarModal
        isOpen={showModalOrdenar}
        onClose={() => setshowModalOrdenar(false)}
        valorSelecionado={valorSelecionado}
        setValorSelecionado={setValorSelecionado}
        filterSelecionado={filterSelecionado}
        setFilterSelecionado={setFilterSelecionado}
        setUsuarios={setUsuarios}
      />

      <EditarModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        usuarioEdit={usuarioEdit}
        setUsuarioEdit={setUsuarioEdit}
        carregarUsuarios={carregarUsuarios}
      />
    </div>
  );
}

export default Usuarios;
