import { useState, useEffect, useRef } from "react";

function dinheiro() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  const registros = [
    { id: "F001", grupo: "Grupo Alpha", aluno: "Breno Groba", id_grupo: "G001", valor: "150.00", tipo: "Entrada", data: "2025-01-15", comprovante: "comp1.png" },
    { id: "F002", grupo: "Grupo Beta", aluno: "Maria Souza", id_grupo: "G002", valor: "200.00", tipo: "Saída", data: "2025-02-10", comprovante: "comp2.png" },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === registros.length) {
      setSelected([]);
    } else {
      setSelected(registros.map((r) => r.id));
    }
  };

  const isAllSelected = selected.length === registros.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial = selected.length > 0 && selected.length < registros.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, registros.length]);

  return (
    <div className="main-container-tabela">
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <button className="btn-tabela formulario-aluno">Formulário</button>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      <p className="indicador-selecionados-tabela">
        {selected.length} registro(s) selecionado(s)
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
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => (
              <tr key={r.id}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    onChange={() => toggleSelect(r.id)}
                  />
                </td>
                <td>{r.id}</td>
                <td>{r.grupo}</td>
                <td>{r.aluno}</td>
                <td>{r.id_grupo}</td>
                <td>{r.valor}</td>
                <td>{r.tipo}</td>
                <td>{r.data}</td>
                <td>{r.comprovante}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default dinheiro;
