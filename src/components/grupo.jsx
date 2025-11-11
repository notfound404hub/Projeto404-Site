import { useState, useEffect, useRef } from "react";
import api from "../api.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import ImportModal from "./modal/importarModal.jsx";
import ExportarModal from "./modal/exportarModal.jsx";
import FiltroModal from "./modal/FilterModal.jsx";
import OrdenarModal from "./modal/ordenarModal.jsx";
import ExcluirModal from "./modal/excluirModal.jsx";
import EditarModal from "./modal/editarModalAluno.jsx";
import { useNavigate } from "react-router-dom";



function Grupo({ onSelectPage }) {
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [grupos, setGrupos] = useState([]);
  const [gruposOriginais, setGruposOriginais] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("grupos_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("Todos");
  const [valorSelecionado, setValorSelecionado] = useState("ID_Grupo");
  const [grupoEdit, setGrupoEdit] = useState(null);
  const [filtros, setFiltros] = useState([]);
  const headerCheckboxRef = useRef(null);

  const navigate = useNavigate()

  const camposGrupo = [
    { value: "ID_Grupo", label: "ID do grupo" },
    { value: "Grupo_Nome", label: "Nome do grupo" },
    { value: "Grupo_Curso", label: "Curso do grupo" }
  ];

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  filtros[0] = "Grupos";

  const carregarGrupos = async () => {
    try {
      const response = await api.post("/grupos");
      console.log(response.data);
      setGrupos(response.data);
      setGruposOriginais(response.data);
    } catch (err) {
      console.error("Erro ao buscar grupos:", err);
      alert(err.response?.data?.error || "Erro ao buscar grupos");
    }
  };

  useEffect(() => {
    carregarGrupos();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === grupos.length) {
      setSelected([]);
    } else {
      setSelected(grupos.map((g) => g.ID_Grupo));
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

  const gerarWorkbook = (dados) => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Grupos");
    return workbook;
  };

  const exportarGrupos = () => {
    let dadosFiltrados = grupos;
    if (exportType === "intervalo") {
      if (!rangeStart || !rangeEnd) {
        alert("Preencha o ID inicial e final!");
        return;
      }
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);
      dadosFiltrados = grupos.filter(
        (u) => u.ID_Grupo >= start && u.ID_Grupo <= end
      );

      if (dadosFiltrados.length === 0) {
        alert("Nenhum grupo encontrado no range informado!");
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

  const handleExportarGrupos = async () => {
    try {
      console.log("Iniciando exportação de todos os grupos...");
      setExportType("Todos");
      await exportarGrupos();
      alert("Planilha exportada com sucesso!");
    } catch (erro) {
      console.error("Erro ao exportar grupos:", erro);
      alert("Erro ao exportar planilha");
    }
  };

  const abrirModalEdicao = async () => {
    if (selected.length !== 1) {
      alert("Selecione exatamente 1 grupo para editar!");
      return;
    }
    const id = selected[0];
    try {
      const response = await api.get(`/grupos/${id}`);

      const grupo = response.data.rows[0]

      setAlunoEdit(grupo);
      setShowEditModal(true);
    } catch (err) {
      console.error("Erro ao buscar grupo:", err);
      alert("Erro ao buscar dados do grupo");
    }
  };


  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button
          className="btn-tabela adicionar-tabela"
          onClick={() => onSelectPage("CadastroGrupo")}
        >
          Adicionar +
        </button>
        <button onClick={() => navigate("/forms")} className="btn-tabela formulario-aluno">Formulário</button>
        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">Mais opções ▾</button>
          <div className="dropdown-content-tabela">
            <a onClick={() => setShowModal(true)}>Exportar grupos</a>
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
              <th>Curso</th>
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
              <tr key={grupo.ID_Grupo}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(grupo.ID_Grupo)}
                    onChange={() => toggleSelect(grupo.ID_Grupo)}
                  />
                </td>
                <td>{grupo.ID_Grupo}</td>
                <td>{grupo.Grupo_Nome}</td>
                <td>{grupo.Grupo_Curso}</td>
                {Array.from({ length: 9 }, (_, i) => (
                  <td key={i}>{grupo[`Aluno_${i + 1}`] || ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
        exportarUsuarios={exportarGrupos}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={carregarGrupos}
        handleExportarGrupos={handleExportarGrupos}
        tabela="Grupo "
      />

      <ExcluirModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        selected={selected}
        setItens={setGrupos}
        carregarItens={carregarGrupos}
        tabela="Grupo "
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
        usuariosOriginais={gruposOriginais}
        setResponse={setGrupos}
        campos={camposGrupo}
        tabela="Grupo "
      />

      <OrdenarModal
        isOpen={showModalOrdenar}
        onClose={() => setshowModalOrdenar(false)}
        valorSelecionado={valorSelecionado}
        setValorSelecionado={setValorSelecionado}
        filterSelecionado={filterSelecionado}
        setFilterSelecionado={setFilterSelecionado}
        setItens={setGrupos}
        tabela="Grupo "
        campos={camposGrupo}
      />

      <EditarModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        grupoEdit={grupoEdit}
        setGrupoEdit={setGrupoEdit}
        carregarGrupos={carregarGrupos}
      />
    </div>
  );
}

export default Grupo;
