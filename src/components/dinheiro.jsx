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
import EditarModal from "./modal/editarModalTransacoes.jsx";

function trasacoes({ onSelectPage }) {
  // Estados principais
  const [selectedFile, setSelectedFile] = useState(null);
  const [filterSelecionado, setFilterSelecionado] = useState("igual");
  const [trasacoes, settrasacoes] = useState([]);
  const [trasacoesOriginais, settrasacoesOriginais] = useState([]);
  const [selected, setSelected] = useState([]);
  const [fileName, setFileName] = useState("trasacoes_exportados");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [exportType, setExportType] = useState("Todos");
  const [valorSelecionado, setValorSelecionado] = useState("ID_trasacao");

  const [trasacaoEdit, settrasacaoEdit] = useState(null);
  const [filtros, setFiltros] = useState([]);
  const headerCheckboxRef = useRef(null);

  const campostrasacao = [
    { value: "ID_trasacao", label: "ID do trasacoes" },
    { value: "trasacao_RA", label: "RA do trasacao" },
    { value: "trasacao_Nome", label: "Nome" },
    { value: "trasacao_Email", label: "Email" },
    { value: "trasacao_CPF", label: "CPF" },
    { value: "trasacao_Telefone", label: "Telefone" },
    { value: "trasacao_Grupo", label: "Grupo" },
    { value: "trasacao_Turma", label: "Turma" },
    { value: "created_at", label: "Data de criação" },
  ];
  // Controle dos modais
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalOrdenar, setshowModalOrdenar] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const teste = "Transacao ";
  filtros[0] = "trasacoes";

  // Opções dos filtros

  // Manipulação de filtros
  const handleChange = (event) => {
    setValorSelecionado(event.target.value);
    if (event.target.value === "id") setFilterSelecionado("igual");
  };

  // Função: carregar trasacoess
  const carregartrasacoes = async () => {
    try {
      const response = await fetch(`http://localhost:500/api/users/tabela`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teste: teste }),
      });

      const data = await response.json();

      if (response.ok) {
        settrasacoes(data);
        settrasacoesOriginais(data);
      } else {
        alert(data.error || "Erro ao buscar trasacoess");
      }
    } catch (err) {
      console.error("Erro ao buscar trasacoess:", err);
      alert("Erro no servidor ao buscar trasacoes");
    }
  };

  useEffect(() => {
    carregartrasacoes();
  }, []);

  // Seleção de trasacoess
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === trasacoes.length) {
      setSelected([]);
    } else {
      setSelected(trasacoes.map((u) => u.ID_trasacao));
    }
  };

  const isAllSelected = selected.length === trasacoes.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < trasacoes.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, trasacoes.length]);

  // Exportação
  const gerarWorkbook = (dados) => {
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "trasacoes");
    return workbook;
  };

  const exportartrasacoes = () => {
    let dadosFiltrados = trasacoes;

    if (exportType === "intervalo") {
      if (!rangeStart || !rangeEnd) {
        alert("Preencha o ID inicial e final!");
        return;
      }
      const start = parseInt(rangeStart, 10);
      const end = parseInt(rangeEnd, 10);
      dadosFiltrados = trasacoes.filter(
        (u) => u.ID_trasacao >= start && u.ID_trasacao <= end
      );

      if (dadosFiltrados.length === 0) {
        alert("Nenhum trasacao encontrado no range informado!");
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

  const handleExportartrasacoes = async () => {
    try {
      console.log("🧾 Iniciando exportação de todos os trasacoess...");
      setExportType("Todos");
      await exportartrasacoes();
      alert("✅ Planilha exportada com sucesso!");
    } catch (erro) {
      console.error("❌ Erro ao exportar trasacoess:", erro);
      alert("Erro ao exportar planilha");
    }
  };

  // Abrir modal de edição
  const abrirModalEdicao = async () => {
    if (selected.length !== 1) {
      alert("Selecione exatamente 1 trasacoes para editar!");
      return;
    }

    const id = selected[0];
    try {
      const response = await fetch(
        `http://localhost:500/api/users/trasacao/${id}`
      );
      if (!response.ok) throw new Error("Erro ao buscar trasacoes");

      const data = await response.json();
      settrasacaoEdit(data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Erro ao buscar trasacoes:", err);
      alert("Erro ao buscar dados do trasacoes");
    }
  };

  // 🔹 JSX
  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button
          className="btn-tabela adicionar-tabela"
          onClick={() => onSelectPage("Cadastrotrasacao")}
        >
          Adicionar +
        </button>

        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">
            Mais opções ▾
          </button>
          <div className="dropdown-content-tabela">
            <a onClick={() => setShowModal(true)}>Exportar trasacoess</a>
            <a onClick={() => setShowImportModal(true)}>Importar trasacoess</a>
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
        {selected.length} trasacoes(s) selecionado(s)
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
              <th>Grupo</th>
              <th>Aluno</th>
              <th>ID_Grupo</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Comprovante</th>
              <th>Criado em</th>
            </tr>
          </thead>

          <tbody>
            {trasacoes.map((u) => (
              <tr key={u.ID_trasacao}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(u.ID_trasacao)}
                    onChange={() => toggleSelect(u.ID_trasacao)}
                  />
                </td>
                <td>{u.ID_Pagamento}</td>
                <td>{u.Grupo}</td>
                <td>{u.Aluno}</td>
                <td>{u.ID_Grupo}</td>
                <td>{u.Valor}</td>
                <td>{u.Tipo}</td>
                <td>{new Date(u.Data).toLocaleDateString("pt-BR")}</td>
                <td>{u.Comprovante}</td>
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
        exportarUsuarios={exportartrasacoes}
      />

      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={carregartrasacoes}
        handleExportartrasacoes={handleExportartrasacoes}
        tabela="Trasacao "
      />

      <ExcluirModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        selected={selected}
        setItens={settrasacoes}
        idField="ID_trasacao"
        carregarItens={carregartrasacoes}
        tabela="Trasacao "
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
        trasacoesOriginais={trasacoesOriginais}
        setResponse={settrasacoes}
        campos={campostrasacao}
        tabela="Trasacao "
      />

      <OrdenarModal
        isOpen={showModalOrdenar}
        onClose={() => setshowModalOrdenar(false)}
        valorSelecionado={valorSelecionado}
        setValorSelecionado={setValorSelecionado}
        filterSelecionado={filterSelecionado}
        setFilterSelecionado={setFilterSelecionado}
        setItens={settrasacoes}
        tabela="Trasacao "
        campos={campostrasacao}
      />

      <EditarModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        trasacaoEdit={trasacaoEdit}
        settrasacaoEdit={settrasacaoEdit}
        carregartrasacoes={carregartrasacoes}
      />
    </div>
  );
}

export default trasacoes;
