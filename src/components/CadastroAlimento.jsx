import { useState } from "react";
import api from "../api";

function CadastroAlimento({ onSelectPage }) {
  const [formData, setFormData] = useState({
    Alimento_Cod: "",
    Alimento_Nome: "",
    Alimento_Marca: "",
    Alimento_Validade: "",
    Alimento_Peso: "",
    Alimento_Quantidade: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true); // modal para novo alimento
  const [eanValido, setEanValido] = useState(false); // controla se EAN existe

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Quando o usuário digitar o código EAN e sair do campo
  const handleEanBlur = async () => {
    if (!formData.Alimento_Cod) return;

    try {
      setLoading(true);
      const res = await api.get(`/codigoAlimento/${formData.Alimento_Cod}`);

      if (res.data) {
        // Produto encontrado: preencher automaticamente
        setFormData((prev) => ({
          ...prev,
          Alimento_Nome: res.data.Alimento_Nome,
          Alimento_Marca: res.data.Alimento_Marca,
          Alimento_Peso: res.data.Alimento_Peso,
        }));
        setEanValido(true);
      } else {
        // Produto não encontrado: abrir modal
        setShowModal(true);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setShowModal(true);
      } else {
        alert("Erro ao buscar alimento no banco.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNovoAlimento = async (e) => {
    e.preventDefault();
    try {
      const { Alimento_Cod, Alimento_Nome, Alimento_Marca, Alimento_Peso } = formData;

      if (!Alimento_Cod || !Alimento_Nome || !Alimento_Marca || !Alimento_Peso) {
        alert("Preencha todos os campos obrigatórios!");
        return;
      }

      const res = await api.post("/cadastroAlimento", {
        Alimento_Cod,
        Alimento_Nome,
        Alimento_Marca,
        Alimento_Peso,
      });

      alert(res.data.msg || "Alimento cadastrado com sucesso!");
      setShowModal(false);
      setEanValido(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar novo alimento.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.Alimento_Cod ||
      !formData.Alimento_Validade ||
      !formData.Alimento_Quantidade
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setLoading(true);
      const dadosEnvio = {
        Alimento_Cod: formData.Alimento_Cod,
        Alimento_Validade: formData.Alimento_Validade,
        Alimento_Quantidade: formData.Alimento_Quantidade,
      };

      const response = await api.post("/doacoes", dadosEnvio);
      alert(response.data.msg || "Doação registrada com sucesso!");

      setFormData({
        Alimento_Cod: "",
        Alimento_Nome: "",
        Alimento_Marca: "",
        Alimento_Validade: "",
        Alimento_Peso: "",
        Alimento_Quantidade: "",
      });
      setEanValido(false);
      if (onSelectPage) onSelectPage("alimentos");
    } catch (err) {
      console.error("Erro no envio:", err);
      alert(err.response?.data?.error || "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Validação de Doações</h2>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Código EAN *</label>
          <input
            type="text"
            name="Alimento_Cod"
            value={formData.Alimento_Cod}
            onChange={handleChange}
            onBlur={handleEanBlur}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="Alimento_Nome"
            value={formData.Alimento_Nome}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Marca</label>
          <input
            type="text"
            name="Alimento_Marca"
            value={formData.Alimento_Marca}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Peso (kg/g)</label>
          <input
            type="text"
            name="Alimento_Peso"
            value={formData.Alimento_Peso}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Validade *</label>
          <input
            type="date"
            name="Alimento_Validade"
            value={formData.Alimento_Validade}
            onChange={handleChange}
            required
            disabled={!eanValido}
          />
        </div>

        <div className="form-group">
          <label>Quantidade *</label>
          <input
            type="number"
            name="Alimento_Quantidade"
            value={formData.Alimento_Quantidade}
            onChange={handleChange}
            required
            min="1"
            disabled={!eanValido}
          />
        </div>

        <button type="submit" className="btn-confirmar" disabled={!eanValido || loading}>
          {loading ? "Enviando..." : "Confirmar Doação"}
        </button>
      </form>

      {/* MODAL para cadastro de novo alimento */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Novo Alimento</h3>
            <form onSubmit={handleNovoAlimento}>
              <label>Código EAN</label>
              <input
                type="text"
                name="Alimento_Cod"
                value={formData.Alimento_Cod}
                disabled
              />
              <label>Nome *</label>
              <input
                type="text"
                name="Alimento_Nome"
                value={formData.Alimento_Nome}
                onChange={handleChange}
                required
              />
              <label>Marca *</label>
              <input
                type="text"
                name="Alimento_Marca"
                value={formData.Alimento_Marca}
                onChange={handleChange}
                required
              />
              <label>Peso *</label>
              <input
                type="text"
                name="Alimento_Peso"
                value={formData.Alimento_Peso}
                onChange={handleChange}
                required
              />

              <div className="footerModal">
                <button type="submit" className="btn-confirmar">
                  Cadastrar
                </button>
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroAlimento;
