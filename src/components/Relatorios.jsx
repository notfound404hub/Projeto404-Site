import { useState, useEffect } from "react";
import api from "../api.js";

// 🔹 Componentes
import FiltroAno from "../components/FiltroAno.jsx";
import ResumoCards from "../components/ResumoCards.jsx";
import GraficoTransacoes from "../components/GraficoTransacoes.jsx";
import GraficoCampanhas from "../components/GraficoCampanhas.jsx";
import GraficoDistribuicaoGrupos from "../components/GraficoDistribuicaoGrupos.jsx";
import GraficoRankingGrupos from "../components/GraficoRankingGrupos.jsx";
import GraficoEvolucaoAlimentos from "../components/GraficoEvolucaoAlimentos.jsx";
import GraficoComparativoFinanceiro from "./GraficoCoorporativoFinanceiro.jsx";
import CardsCampanhas from "../components/CardsCampanhas.jsx";

export default function Relatorios() {
    const [ano, setAno] = useState(new Date().getFullYear());
    const [resumo, setResumo] = useState({});
    const [transacoes, setTransacoes] = useState([]);
    const [campanhas, setCampanhas] = useState([]);
    const [distribuicaoGrupos, setDistribuicaoGrupos] = useState([]);
    const [rankingGrupos, setRankingGrupos] = useState([]);
    const [evolucaoAlimentos, setEvolucaoAlimentos] = useState([]);
    const [comparativoFinanceiro, setComparativoFinanceiro] = useState([]);
    const [statusCampanhas, setStatusCampanhas] = useState({});

    // lista de grupos (preenchida pela API para o ano selecionado) e filtro selecionado
    const [gruposList, setGruposList] = useState(["Todos"]);
    const [grupoSelecionado, setGrupoSelecionado] = useState("Todos");

    useEffect(() => {
        carregarDados();
    }, [ano, grupoSelecionado]); // recarrega ao mudar ano ou grupo

    const carregarDados = async () => {
        try {
            // se selecionou um grupo específico, adiciona query string; caso "Todos", não adiciona
            const qs = grupoSelecionado && grupoSelecionado !== "Todos"
                ? `?grupo=${encodeURIComponent(grupoSelecionado)}`
                : "";

            const [
                resAlimentos,
                resRanking,       // <-- agora sem filtro de grupo
                resAlunos,
                resUsuarios,
                resDoacoes,
                resGruposPorAno, // <-- será usado para popular o select de grupos
                resTransacoes,
                resCampanhas,
                resDistGrupos,
                resEvolucao,
                resComparativo,
                resStatusCamp
            ] = await Promise.all([
                api.get(`/totalAlimentos/${ano}`).catch(err => {
                    console.error("Erro em totalAlimentos:", err);
                    return { data: { totalAlimentos: 0 } };
                }),
                // REMOVI o qs aqui — ranking deve ser por ano apenas
                api.get(`/rankingGrupos/${ano}`).catch(err => {
                    console.error("Erro em rankingGrupos:", err);
                    return { data: [] };
                }),
                api.get(`/quantidadeAlunos/${ano}`).catch(err => {
                    console.error("Erro em quantidadeAlunos:", err);
                    return { data: { totalAlunos: 0 } };
                }),
                api.get(`/quantidadeUsuarios/${ano}`).catch(err => {
                    console.error("Erro em quantidadeUsuarios:", err);
                    return { data: { totalUsuarios: 0 } };
                }),
                api.get(`/quantidadeDoacoes/${ano}`).catch(err => {
                    console.error("Erro em quantidadeDoacoes:", err);
                    return { data: { totalDoacoes: 0, valorTotal: 0 } };
                }),
                // chama a API que retorna os grupos referentes ao ano selecionado
                api.get(`/gruposAno/${ano}`).catch(err => {
                    console.error("Erro em grupos por ano:", err);
                    return { data: [] };
                }),
                // as rotas abaixo recebem o filtro de grupo via qs
                api.get(`/transacoes/${ano}${qs}`).catch(err => {
                    console.error("Erro em transacoes:", err);
                    return { data: [] };
                }),
                api.get(`/campanhas/${ano}${qs}`).catch(err => {
                    console.error("Erro em campanhas:", err);
                    return { data: [] };
                }),
                api.get(`/distribuicaoGrupos/${ano}${qs}`).catch(err => {
                    console.error("Erro em distribuicaoGrupos:", err);
                    return { data: [] };
                }),
                api.get(`/evolucaoAlimentos/${ano}${qs}`).catch(err => {
                    console.error("Erro em evolucaoAlimentos:", err);
                    return { data: [] };
                }),
                api.get(`/comparativoFinanceiro/${ano}${qs}`).catch(err => {
                    console.error("Erro em comparativoFinanceiro:", err);
                    return { data: [] };
                }),
                api.get(`/statusCampanhas/${ano}${qs}`).catch(err => {
                    console.error("Erro em statusCampanhas:", err);
                    return { data: { ativas: 0, concluidas: 0, metaAtingida: 0, taxaSucesso: 0 } };
                })
            ]);

            setResumo({
                totalAlimentos: resAlimentos.data?.totalAlimentos ?? 0,
                totalAlunos: resAlunos.data?.totalAlunos ?? 0,
                totalUsuarios: resUsuarios.data?.totalUsuarios ?? 0,
                totalDoacoes: resDoacoes.data?.totalDoacoes ?? 0,
                valorTotalDoacoes: resDoacoes.data?.valorTotal ?? 0,
                rankingGrupos: resRanking.data ?? [],
                grupos: resGruposPorAno.data ?? [],
            });

            setTransacoes(resTransacoes.data ?? []);
            setCampanhas(resCampanhas.data ?? []);
            setDistribuicaoGrupos(resDistGrupos.data ?? []);
            setRankingGrupos(resRanking.data ?? []);
            setEvolucaoAlimentos(resEvolucao.data ?? []);
            setComparativoFinanceiro(resComparativo.data ?? []);
            setStatusCampanhas(resStatusCamp.data ?? {});

            // popula a lista de grupos a partir da resposta da API para o ano selecionado
            const listaRaw = resGruposPorAno.data ?? [];
            const normalizeName = (g) => {
                if (!g) return null;
                if (typeof g === "string") return g;
                return g.Grupo_Nome ?? g.nome ?? g.name ?? null;
            };
            const nomes = Array.isArray(listaRaw) ? listaRaw.map(normalizeName).filter(Boolean) : [];
            const uniq = ["Todos", ...Array.from(new Set(nomes))];
            setGruposList(uniq);

            // garante que o filtro atual exista na nova lista; se não, reseta para "Todos"
            if (!uniq.includes(grupoSelecionado)) {
                setGrupoSelecionado("Todos");
            }

        } catch (err) {
            console.error("❌ Erro ao carregar dados do relatório:", err);
        }
    };

    return (
        <div className="dashboard">
            {/* 🔹 Filtro e Cards de Resumo */}
            <div className="dashboard-top" style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
               <div> <FiltroAno ano={ano} setAno={setAno} />
                <div className="selectsDash">
                    <select
                        value={grupoSelecionado}
                        onChange={(e) => setGrupoSelecionado(e.target.value)}

                    >
                        {gruposList.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>
                </div>
                <ResumoCards resumo={resumo} />
            </div>

            {/* 🔹 Grid Principal de Gráficos */}
            <div className="graficos-container">
                {/* Linha 1 - Gráficos Financeiros */}
                <div className="grafico-card">
                    <h2 className="grafico-titulo">📈 Transações por Mês</h2>
                    <div className="grafico-wrapper">
                        <GraficoTransacoes dados={transacoes} />
                    </div>
                </div>

                <div className="grafico-card">
                    <h2 className="grafico-titulo">💰 Entrada vs Saída</h2>
                    <div className="grafico-wrapper">
                        <GraficoComparativoFinanceiro dados={comparativoFinanceiro} />
                    </div>
                </div>

                {/* Linha 2 - Campanhas */}
                <div className="grafico-card">
                    <h2 className="grafico-titulo">🎯 Campanhas por Mês</h2>
                    <div className="grafico-wrapper">
                        <GraficoCampanhas dados={campanhas} />
                    </div>
                </div>

                <div className="grafico-card card-status">
                    <h2 className="grafico-titulo">📊 Status das Campanhas</h2>
                    <CardsCampanhas status={statusCampanhas} />
                </div>

                {/* Linha 3 - Análise de Grupos */}
                <div className="grafico-card">
                    <h2 className="grafico-titulo">🥇 Ranking de Grupos</h2>
                    <div className="grafico-wrapper">
                        <GraficoRankingGrupos dados={rankingGrupos} />
                    </div>
                </div>

                <div className="grafico-card">
                    <h2 className="grafico-titulo">🍰 Distribuição por Grupo</h2>
                    <div className="grafico-wrapper">
                        <GraficoDistribuicaoGrupos dados={distribuicaoGrupos} />
                    </div>
                </div>

                {/* Linha 4 - Evolução de Alimentos */}
                <div className="grafico-card grafico-largo">
                    <h2 className="grafico-titulo">📦 Evolução de Alimentos ao Longo do Ano</h2>
                    <div className="grafico-wrapper">
                        <GraficoEvolucaoAlimentos dados={evolucaoAlimentos} />
                    </div>
                </div>
            </div>
        </div>
    );
}