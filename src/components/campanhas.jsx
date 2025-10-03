import { useState, useEffect, useRef } from "react";

function Campanhas() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  const eventos = [
    { id: "E001", nome: "Feira de Ciências", local: "Auditório", grupo: "Grupo Alpha", meta: "Arrecadar R$500", quantidade: "100", dataInicio: "2025-03-01", dataFim: "2025-03-05" },
    { id: "E002", nome: "Hackathon", local: "Laboratório", grupo: "Grupo Beta", meta: "Criar 5 apps", quantidade: "50", dataInicio: "2025-04-10", dataFim: "2025-04-12" },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === eventos.length) {
      setSelected([]);
    } else {
      setSelected(eventos.map((e) => e.id));
    }
  };

  const isAllSelected = selected.length === eventos.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial = selected.length > 0 && selected.length < eventos.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, eventos.length]);

  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      <p className="indicador-selecionados-tabela">
        {selected.length} evento(s) selecionado(s)
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
              <th>Data Início</th>
              <th>Data Fim</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((e) => (
              <tr key={e.id}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(e.id)}
                    onChange={() => toggleSelect(e.id)}
                  />
                </td>
                <td>{e.id}</td>
                <td>{e.nome}</td>
                <td>{e.local}</td>
                <td>{e.grupo}</td>
                <td>{e.meta}</td>
                <td>{e.quantidade}</td>
                <td>{e.dataInicio}</td>
                <td>{e.dataFim}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Campanhas;
