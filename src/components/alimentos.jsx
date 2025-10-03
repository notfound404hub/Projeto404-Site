import { useState, useEffect, useRef } from "react";

function Alimentos() {
  const [selected, setSelected] = useState([]);
  const headerCheckboxRef = useRef(null);

  // 🔹 Dados fictícios para teste
  const alimentos = [
    {
      id: "A001",
      grupo: "Grupo Alpha",
      aluno: "Breno Groba",
      id_grupo: "G001",
      alimento: "Arroz",
      marca: "Tio João",
      codigoBarras: "7891234567890",
      validade: "2025-12-31",
      entrada: "2025-09-01",
      peso: "5kg",
      qtd: 10,
      total: "50kg",
    },
    {
      id: "A002",
      grupo: "Grupo Beta",
      aluno: "João Silva",
      id_grupo: "G002",
      alimento: "Feijão",
      marca: "Carioca",
      codigoBarras: "7899876543210",
      validade: "2025-11-15",
      entrada: "2025-09-05",
      peso: "1kg",
      qtd: 20,
      total: "20kg",
    },
    {
      id: "A003",
      grupo: "Grupo Gama",
      aluno: "Maria Souza",
      id_grupo: "G003",
      alimento: "Macarrão",
      marca: "Renata",
      codigoBarras: "7896541237890",
      validade: "2025-10-20",
      entrada: "2025-09-10",
      peso: "500g",
      qtd: 30,
      total: "15kg",
    },
    {
      id: "A004",
      grupo: "Grupo Delta",
      aluno: "Pedro Santos",
      id_grupo: "G004",
      alimento: "Leite",
      marca: "Itambé",
      codigoBarras: "7897418529630",
      validade: "2025-09-25",
      entrada: "2025-09-15",
      peso: "1L",
      qtd: 50,
      total: "50L",
    },
    {
      id: "A005",
      grupo: "Grupo Epsilon",
      aluno: "Ana Lima",
      id_grupo: "G005",
      alimento: "Óleo",
      marca: "Soya",
      codigoBarras: "7899638527410",
      validade: "2026-01-10",
      entrada: "2025-09-20",
      peso: "900ml",
      qtd: 40,
      total: "36L",
    },
  ];

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === alimentos.length) {
      setSelected([]);
    } else {
      setSelected(alimentos.map((a) => a.id));
    }
  };

  const isAllSelected = selected.length === alimentos.length;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      const isPartial =
        selected.length > 0 && selected.length < alimentos.length;
      headerCheckboxRef.current.indeterminate = isPartial;
    }
  }, [selected, alimentos.length]);

  return (
    <div className="main-container-tabela">
      {/* Cabeçalho com botões */}
      <div className="cabecalho-tabela">
        <button className="btn-tabela adicionar-tabela">Adicionar +</button>
        <button className="btn-tabela formulario-aluno">Formulário</button>
        <div className="dropdown-tabela">
          <button className="btn-tabela mais-opcoes-tabela">Mais opções ▾</button>
          <div className="dropdown-content-tabela">
            <a href="#">Exportar alimentos</a>
            <a href="#">Importar alimentos</a>
            <a href="#">Excluir</a>
            <a href="#">Editar</a>
          </div>
        </div>
        <div className="rightMenu-tabela">
          <button className="btn-tabela filtrar-tabela">Filtrar</button>
          <button className="btn-tabela ordenar-tabela">Ordenar</button>
        </div>
      </div>

      {/* Indicador de itens selecionados */}
      <p className="indicador-selecionados-tabela">
        {selected.length} alimento(s) selecionado(s)
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
              <th>Alimento</th>
              <th>Marca</th>
              <th>Código de Barras</th>
              <th>Validade</th>
              <th>Entrada</th>
              <th>Peso</th>
              <th>Qntd</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {alimentos.map((item) => (
              <tr className="tr-aluno" key={item.id}>
                <td>
                  <input
                    className="chk-tabela"
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.grupo}</td>
                <td>{item.aluno}</td>
                <td>{item.id_grupo}</td>
                <td>{item.alimento}</td>
                <td>{item.marca}</td>
                <td>{item.codigoBarras}</td>
                <td>{item.validade}</td>
                <td>{item.entrada}</td>
                <td>{item.peso}</td>
                <td>{item.qtd}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Alimentos;
