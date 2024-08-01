const env = import.meta.env.VITE_ENV;
const productionApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// Set the apiBaseUrl based on the environment
export const apiBaseUrl = env === 'dev'
  ? 'http://localhost:3001/api'
  : productionApiBaseUrl;