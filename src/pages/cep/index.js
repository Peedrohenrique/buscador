import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style.css";
import Api from "../../services/api";
import swal from "sweetalert";

export default function Buscador() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});


  async function handleSearch() {
    if (input === "") {
      swal("Oops!", "Preencha algum CEP!,", "error");
      return;
    }
    try {
      const res = await Api.get(`${input}/json`);
      setCep(res.data);
      setInput("");
    } catch {
      swal("Oops!", "CEP errado!!!,", "error");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerImput">
        <input
          type="Number"
          placeholder="Digite seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && ( //Renderização condicional
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>ddd: {cep.ddd}</span>
          <span>Siafi: {cep.siafi}</span>
          <span>Ibge: {cep.ibge}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            Localidade: {cep.localidade}-{cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}
