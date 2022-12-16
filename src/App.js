import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import "./css/cep.css";
import api from "./services/api"

function App() {

  const [ceptxt, Setceptxt] = useState("");
  const [reqcep, Setreqcep] = useState({});

  const handlecep = async () =>
  {
    if((ceptxt.length === 8) || (ceptxt.length === 9))
    {
      try
      {
        const response = await api.get(`${ceptxt}/json/`);
        Setreqcep(response.data);
      }
      catch(error)
      {
        Setreqcep({});
      }
    }
  }

  return (
    <div className="content">
      <header>
        <h1><label htmlFor="txtcep">Buscador de CEP</label></h1>

        <main id="searchCEP">
          <input 
          type="text" 
          name="txtcep" 
          id="txtcep" 
          placeholder="Digite seu CEP aqui" 
          value={ceptxt} 
          autoFocus
          onChange={(e) => Setceptxt(e.target.value)}
          onKeyDownCapture={(e) => {if (["Enter", "NumpadEnter"].includes(e.code)) return handlecep()}}
          />

          <button type="submit" id="btn-search" onClickCapture={handlecep}>
            <FaSearchLocation/>
          </button>
          
        </main>
      </header>

      <aside>
        <h2>{reqcep.cep ? "CEP: " : "Digite um CEP valido"} {reqcep.cep}</h2>
        <span>{reqcep.localidade}{reqcep.uf && "-"}{reqcep.uf}</span>
        <span>{reqcep.bairro && "Bairro "}{reqcep.bairro}</span>
        <span>{reqcep.logradouro}</span>
        <span>{reqcep.complemento}</span>
      </aside> 
    </div>
  );
}

export default App;
