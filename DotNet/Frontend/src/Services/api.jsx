// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080/user'; // Update with your backend URL

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests if available (excluding /signup endpoint)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token && !config.url.includes('/signup')) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const register = async (userData) => {
//   try {
//     const response = await api.post('/signup', userData); // API endpoint for registration
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const login = async (credentials) => {
//     try {
//       const response = await api.post('/signin', credentials);
//        return response;
//      } catch (error) {
//        throw error;
//      }
//    };

//    export const fetchUsersByGender = async (userGender) => {
//     try {
//       const endpoint = userGender === 'male' ? '/user/females' : '/user/males';
//       const response = await api.get(endpoint);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       throw error;
//     }
//   };
  
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if available (excluding /signup endpoint)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && !config.url.includes('/signup')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** 
 * Registers a new user
 * @param {Object} userData - The user data for registration
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/signup', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

/** 
 * Logs in a user
 * @param {Object} credentials - The user's login credentials
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/signin', credentials);
    return response;
  } catch (error) {
    throw error;
  }
};

/** 
 * Fetches users of the opposite gender
 * @param {string} userGender - The logged-in user's gender
 * @returns {Array} List of opposite-gender users
 */
export const fetchUsersByGender = async (userGender) => {
  try {
    const endpoint = userGender === 'male' ? '/user/females' : '/user/males';
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// ✅ Exporting api instance as default to fix import issues
export default api;

