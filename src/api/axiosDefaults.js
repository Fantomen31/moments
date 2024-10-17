import axios from "axios";

axios.defaults.baseURL = 'https://drf-api-fantomen-82373067f7b7.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'MULTIPART/FORM-DATA'
axios.defaults.withCredentials = true