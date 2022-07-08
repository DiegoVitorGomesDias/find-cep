import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import "./css/cep.css";
import api from "./services/api"

function App() {

  //@Felipe, consegui fazer o que queria, ficou desse jeito.
  //obs. usei objeto alternarios no html com jsx

  const [ceptxt, Setceptxt] = useState("");
  const [reqcep, Setreqcep] = useState({});

  //função assíncrona para buscar o cep via json
  const handlecep = async () =>
  {
    console.log(ceptxt);

    //se digitou o cep corretamente, fazer a busca
    if((ceptxt.length === 8) || (ceptxt.length === 9))
    {
      try
      {
        const response = await api.get(`${ceptxt}/json/`);
        Setreqcep(response.data);
        console.log(response.data);                 
      }
      catch(error)
      {
        console.log(error);
        Setreqcep({});
        Setceptxt("");
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
          onDragEnter={(e) => console.log(e)}
          onKeyDownCapture={(e) => {if (e.code === "Enter" || e.code === "NumpadEnter"){return handlecep()}}}
          /* onKeyDownCapture={(e) => console.log(e.code)} */
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
