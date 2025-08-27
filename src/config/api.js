const API_BASE_URL = import.meta.env.PROD
  ? 'https://votre-app.northflank.app/api'  // Production
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';  // Local

export default API_BASE_URL;