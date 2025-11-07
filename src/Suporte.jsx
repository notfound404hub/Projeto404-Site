import React, { useState, useEffect } from "react";
import PainelSuporte from "./components/PainelSuporte";
import PainelTutoriais from "./components/PainelTutoriais";
import CriacaoChamado from "./components/modal/criacaoChamado";
import Chamados from "./components/chamados.jsx";
 
const tutoriais=[
  { titulo: "Como abrir um chamado" },
  { titulo: "Acompanhar o status de um chamado" },
  { titulo: "Finalizar chamados resolvidos" },
]

const Suporte = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tela, setTela] = useState("painel"); // painel | chamados
  const [tipoChamado, setTipoChamado] = useState("");
  const [chamados, setChamados] = useState([]);

  const Chamado_Criador = localStorage.getItem("ID_Usuario");

  const carregarChamados = async () => {
    try {
      const response = await fetch("http://localhost:500/api/users/chamados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Chamado_Criador }),
      });

      const data = await response.json();

      if (response.ok) {
        setChamados(data);
      } else {
        alert(data.error || "Erro ao buscar chamados.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar chamados.");
    }
  };

  useEffect(() => {
    carregarChamados();
  }, []);

  const chamadosAbertos = chamados.filter((c) => c.Chamado_Status === "Aberto");
  const chamadosEmSolucao = chamados.filter(
    (c) => c.Chamado_Status === "Em solução"
  );
  const chamadosFinalizados = chamados.filter(
    (c) => c.Chamado_Status === "Finalizado"
  );

  return (
    <div className="suporte-container">
      {tela === "painel" && (
        <div className="suporte-content">
          <PainelSuporte
            chamadosAbertos={chamadosAbertos}
            chamadosEmSolucao={chamadosEmSolucao}
            chamadosFinalizados={chamadosFinalizados}
            onNovoChamado={() => setMostrarModal(true)}
            onVerChamados={(tipo) => {
              setTipoChamado(tipo);
              setTela("chamados");
            }}
          />
          <PainelTutoriais 
          tutoriais={tutoriais}/>
        </div>
      )}

      {tela === "chamados" && (
        <Chamados
          tipo={tipoChamado}
          chamados={chamados}
          onVoltar={() => setTela("painel")}
          carregarChamados={carregarChamados}
        />
      )}

      {mostrarModal && (
        <CriacaoChamado
          onClose={() => setMostrarModal(false)}
          carregarChamados={carregarChamados}
        />
      )}
    </div>
  );
};

export default Suporte;
