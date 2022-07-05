import axios from "axios"; 

//URL: http://viacep.com.br/ws/36904108/json/

const api = axios.create({
    baseURL: "http://viacep.com.br/ws/"
})

export default api;