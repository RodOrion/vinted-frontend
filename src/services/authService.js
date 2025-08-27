import API_BASE_URL from '../config/api';

// Fonction utilitaire pour les messages d'erreur
function getErrorMessage(status) {
  switch (status) {
    case 401:
      return 'Email ou mot de passe incorrect';
    case 409:
      return 'Un compte existe déjà avec cet email';
    case 422:
      return 'Données invalides';
    case 500:
      return 'Erreur serveur, veuillez réessayer';
    default:
      return 'Une erreur est survenue';
  }
}

export const authService = {
  // Connexion
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || getErrorMessage(response.status));
      }
      
      return data;
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Erreur de connexion au serveur');
      }
      throw error;
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || getErrorMessage(response.status));
      }
      
      return data;
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Erreur de connexion au serveur');
      }
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },

  // Récupérer le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Récupérer les données utilisateur
  getUser: () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  // Vérifier la validité du token (optionnel)
  verifyToken: async () => {
    const token = authService.getToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      return response.ok;
    } catch (error) {
      console.error('Erreur vérification token:', error);
      return false;
    }
  }
};