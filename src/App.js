import { useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import "./css/cep.css";
import api from "./services/api"

function App() {

  const [ceptxt, Setceptxt] = useState("");
  const [reqcep, Setreqcep] = useState({});
  const [bairrotxt, Setbairrotxt] = useState();

  //função assíncrona para buscar o cep via json
  const handlecep = async () =>
  {
    console.log(ceptxt);

    //se digitou o cep corretamente, fazer a busca
    if((ceptxt.length == 8) || (ceptxt.length == 9))
    {
      try
      {
        const response = await api.get(`${ceptxt}/json/`);

        Setreqcep(response.data);
        //nesse momento eu queria mudar a string dentro do objeto reqcep.bairro, e atualizar o componente
        //mas ainda n consegui sem usar outro useState, oq deixa o código repetitivo e feio
        Setbairrotxt(`Bairro: ${response.data.bairro}`);
        console.log(reqcep);
      }
      catch
      {
        Setceptxt("");
      }
    }

  }

  return (
    <div className="content">
      <header>
        <h1>Buscador de CEP</h1>

        <main id="searchCEP">
          <input 
          type="text" 
          name="txtcep" 
          id="txtcep" 
          placeholder="Digite seu CEP aqui" 
          value={ceptxt} 
          onChange={(e) => Setceptxt(e.target.value)}
          />

          <button id="btn-search" onClickCapture={handlecep}>
            <FaSearchLocation/>
          </button>
        </main>
      </header>

      <aside>
        <h2>CEP: {reqcep.cep}</h2>
        <span>{reqcep.localidade}-{reqcep.uf}</span>
        {/* aqui estou usando o state do bairro, mas queria usar 
        diretamente de toda às localizações, que está no objeto "reqcep" */}
        <span>{bairrotxt}</span>
        <span>{reqcep.logradouro}</span>
        <span>{reqcep.complemento}</span>
      </aside> 
    </div>
  );
}

export default App;
