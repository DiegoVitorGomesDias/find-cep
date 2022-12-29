import axios from "axios"; 

//URL: http://viacep.com.br/ws/36904108/json/

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})

export default api;