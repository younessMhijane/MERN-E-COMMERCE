import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Remplacez par l'URL de votre backend
  withCredentials: true, // Pour inclure les cookies
});

export default instance;
