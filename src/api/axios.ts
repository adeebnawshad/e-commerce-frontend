import axios from 'axios'
import { getToken } from '../utils/token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com', // prefix for all requests. So api.get('/products') becomes https://fakestoreapi.com/products.
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api // axios instance that automatically adds the token to the Authorization header on every request.

// An interceptor runs before each request goes out.
// Read the JWT from localStorage via getToken().
// If it exists, set Authorization: Bearer <token>.
// Return the updated config so the request continues.

// So after login you don’t pass the token manually on every call — 
// anything using api gets it automatically.
// That matters for protected endpoints like POST /carts.

// Think of api as your app’s phone line to Fake Store:
// baseURL = the number you always dial
// interceptor = automatically saying “it’s me” (token) on every call
// one shared instance = same settings everywhere, easy to change later