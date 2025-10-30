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

function Campanhas({ onSelectPage }) {
  // Estados principais
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [campanhas, setCampanhas] = useState([]);
  const [campanhasOriginais, setCampanhasOriginais] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("campanhas_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("Todos");
  const [valorSelecionado, setValorSelecionado] = useState("ID_Campanha");

  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [filtros, setFiltros] = useState([]);
  const headerCheckboxRef = useRef(null);

  const camposCampanhas = [
    { value: "ID_Campanha", label: "ID da Campanha" },
    { value: "Campanha_Nome", label: "Nome da Campanha" },
    { value: "Campanha_Local", label: "Local" },
    { value: "Campanha_Grupo", label: "Grupo" },
    { value: "Campanha_Meta", label: "Meta" },
    { value: "Campanha_Quantidade", label: "Quantidade" },
    { value: "created_at", label: "Data de criação" },
    { value: "finish_at", label: "Data de Finalização" },
  ];
  // Controle dos modais
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const teste = "Campanha ";
  filtros[0] = "Campanhas";

  // Manipulação de filtros
  const handleChange = (event) => {
    setValorSelecionado(event.target.value);
    if (event.target.value === "id") setFilterSelecionado("igual");
  };

  // Função: carregar campanhas (defensiva)
  const carregarCampanhas = async () => {
    try {
      const response = await fetch(`http://localhost:500/api/users/tabela`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teste: teste }),
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setCampanhas(data);
        setCampanhasOriginais(data);
      } else {
        // se a API retornar { error: ... } ou objeto qualquer, protege o estado
        console.error("Resposta inválida ao carregar campanhas:", data);
        setCampanhas([]);
        setCampanhasOriginais([]);
        alert(data?.error || "Erro ao buscar campanhas");
      }
    } catch (err) {
      console.error("Erro ao buscar campanhas:", err);
      alert("Erro no servidor ao buscar campanhas");
      setCampanhas([]);
      setCampanhasOriginais([]);
    }
  };

  useEffect(() => {
    carregarCampanhas();
  }, []);

  // Seleção de usuários/campanhas
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === (campanhas?.length || 0)) {
      setSelected([]);
    } else {
      setSelected((campanhas || []).map((u) => u.ID_Campanha));
    }
  };

  // protege contra campanhas undefined
  const isAllSelected =
    (campanhas?.length || 0) > 0 && selected.length === campanhas.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < (campanhas?.length || 0);
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, campanhas?.length]);

  // Exportação (mantive sua lógica)
  const gerarWorkbook = (dados) => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Campanhas");
    return workbook;
  };

  const exportarUsuarios = () => {
    let dadosFiltrados = campanhas || [];

    if (exportType === "intervalo") {
      if (!rangeStart || !rangeEnd) {
        alert("Preencha o ID inicial e final!");
        return;
      }
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);
      dadosFiltrados = (campanhas || []).filter(
        (u) => u.ID_Campanha >= start && u.ID_Campanha <= end
      );

      if (dadosFiltrados.length === 0) {
        alert("Nenhuma campanha encontrada no range informado!");
        return;
      }
    }

    const workbook = gerarWorkbook(dadosFiltrados);
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blobData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blobData, `${fileName}.xlsx`);
    setShowModal(false);
  };

  const handleExportarUsuarios = async () => {
    try {
      setExportType("Todos");
      await exportarUsuarios();
      alert("✅ Planilha exportada com sucesso!");
    } catch (erro) {
      console.error("❌ Erro ao exportar campanhas:", erro);
      alert("Erro ao exportar planilha");
    }
  };

  // Exclusão de campanhas

  // Abrir modal de edição
  const abrirModalEdicao = async () => {
    if (selected.length !== 1) {
      alert("Selecione exatamente 1 campanha para editar!");
      return;
    }

    const id = selected[0];
    try {
      const response = await fetch(
        `http://localhost:500/api/users/usuario/${id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar campanha");

      const data = await response.json();
      setUsuarioEdit(data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Erro ao buscar campanha:", err);
      alert("Erro ao buscar dados da campanha");
    }
  };

  // 🔹 JSX
  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button
          className="btn-tabela adicionar-tabela"
          onClick={() => onSelectPage("CadastroCampanha")}
        >
          Adicionar +
        </button>

        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">
            Mais opções ▾
          </button>
          <div className="dropdown-content-tabela">
            <a onClick={() => setShowModal(true)}>Exportar campanhas</a>
            <a onClick={() => setShowImportModal(true)}>Importar campanhas</a>
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
        {selected.length} campanha(s) selecionada(s)
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
              <th>Local</th>
              <th>Grupo</th>
              <th>Meta</th>
              <th>Quantidade</th>
              <th>Criado em</th>
              <th>Acaba em</th>
            </tr>
          </thead>

          <tbody>
            {(campanhas || []).map((u) => (
              <tr key={u.ID_Campanha}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(u.ID_Campanha)}
                    onChange={() => toggleSelect(u.ID_Campanha)}
                  />
                </td>
                <td>{u.ID_Campanha}</td>
                <td>{u.Campanha_Nome}</td>
                <td>{u.Campanha_Local}</td>
                <td>{u.Campanha_Grupo}</td>
                <td>{u.Campanha_Meta}</td>
                <td>{u.Campanha_Quantidade}</td>
                <td>
                  {u.created_at
                    ? new Date(u.created_at).toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                      })
                    : ""}
                </td>
                <td>
                  {u.finish_at
                    ? new Date(u.finish_at).toLocaleDateString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                      })
                    : ""}
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
        onImportSuccess={carregarCampanhas}
        handleExportarUsuarios={handleExportarUsuarios}
      />

      <ExcluirModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        selected={selected}
        setItens={setUsuarios} 
        idField="ID_Campanha" 
        carregarItens={carregarCampanhas} 
          tabela="Campanha "
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
        usuariosOriginais={campanhasOriginais} 
        setUsuarios={setCampanhas} 
        setResponse={
          setCampanhas
        } 
        campos={camposCampanhas}
        tabela="Campanha "
      />

      <OrdenarModal
        isOpen={showModalOrdenar}
        onClose={() => setshowModalOrdenar(false)}
        valorSelecionado={valorSelecionado}
        setValorSelecionado={setValorSelecionado}
        filterSelecionado={filterSelecionado}
        setFilterSelecionado={setFilterSelecionado}
        setUsuarios={setCampanhas} // compatibilidade com OrdenarModal que espera esse nome
        setCampanhas={setCampanhas} // caso outra versão espere este
        tabela="Campanha "
        campos={camposCampanhas}
      />

      <EditarModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        usuarioEdit={usuarioEdit}
        setUsuarioEdit={setUsuarioEdit}
        carregarCampanhas={carregarCampanhas}
      />
    </div>
  );
}

export default Campanhas;
