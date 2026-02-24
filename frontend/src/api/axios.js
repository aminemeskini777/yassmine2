import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if(token){
  config.headers.Authorization = `Bearer ${token}`;
}

return config;

} );

export default api;

//tafsir :
// axios est une bibliothèque JavaScript utilisée pour faire des requêtes HTTP depuis le navigateur. Dans ce code, nous créons une instance d'axios avec une configuration de base qui inclut l'URL de base de l'API et les en-têtes par défaut. Nous ajoutons également un intercepteur de requête qui ajoute un token d'authentification à chaque requête si le token est présent dans le localStorage. Enfin, nous exportons cette instance d'axios pour l'utiliser dans d'autres parties de notre application.
//  config.headers.Authorization = `Bearer ${token}`; => ajoute un en-tête d'autorisation à la requête HTTP avec le token d'authentification récupéré du localStorage. Cela permet à l'API de vérifier que la requête est authentifiée et autorisée à accéder aux ressources protégées.
