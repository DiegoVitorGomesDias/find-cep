import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import { FaSearchLocation } from "react-icons/fa";
import "./css/cep.css";
import api from "./services/api"

function App() {
  const [ reqcep, setReqCep ] = useState([])

  const validationSchemaSearch = yup.object().shape
  ({
    uf: yup.string().required("Required").length(2, "Use a sigla do Estado").lowercase(),
    city: yup.string().required("Required").min(2, "Digite o nome completo da cidade").lowercase(),
    publicPlace: yup.string().required("Required").min(2, "Digite o nome completo da rua").lowercase()
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, isSubmitting  } = useFormik
  ({
    initialValues: { uf: "", city: "", publicPlace: "" },
    validationSchema: validationSchemaSearch,
    onSubmit: async (values) =>
    {
      const res = await api.get(`/${values.uf}/${values.city}/${values.publicPlace}/json`);
      setReqCep(res.data);
    }
  })
  

  return (
    <div className="content">
      <header>
        <a href="https://github.com/DiegoVitorGomesDias"><img src="/logo.png" alt="logo" /></a>
        <a href="https://github.com/DiegoVitorGomesDias" target="_blank" rel="noopener noreferrer">GitHub</a>
      </header>
      <main>
        <h1>Buscador de CEP</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="uf" id="uf"
              placeholder="Insira aqui a sigla do seu Estado"
              value={values.uf}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small>{touched.uf && errors.uf}</small>
          </div>

          <div>
            <input
              type="text"
              name="city" id="city"
              value={values.city}
              placeholder="Digite aqui o nome da sua Cidade"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <small>{touched.city && errors.city}</small>
          </div>

          <div>
            <input
              type="text"
              name="publicPlace" id="publicPlace"
              value={values.publicPlace}
              placeholder="Digite aqui o nome da Rua"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDownCapture={(e) => { if (["Enter", "NumpadEnter"].includes(e.code)) return handleSubmit} }
            />
            <small>{touched.publicPlace && errors.publicPlace}</small>
          </div>
            
          <button type="submit" id="btn-search" disabled={!isValid || isSubmitting}>
            <FaSearchLocation/>
          </button>

        </form>

        <aside>
          { reqcep.map( cep => (
            <div key={cep.cep}>
              <h2>{cep.cep ? "CEP: " : "Digite um Endereço Valido"} {cep.cep}</h2>
              <span>{cep.localidade}{cep.uf && "-"}{cep.uf}</span>
              <span>{cep.bairro && "Bairro "}{cep.bairro}</span>
              <span>{cep.logradouro}</span>
              <span>{cep.complemento}</span>
            </div>

          ) ) }
        </aside> 

      </main>
    </div>
  );
}

export default App;
