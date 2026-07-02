import api from './axios'

type LoginResponse = { // type of the response body
  token: string
}

// Fake Store test user — see https://fakestoreapi.com/docs
export async function loginUser(
  username: string,
  password: string,
): Promise<LoginResponse> {
  // sends a login request to Fake Store and pulls the response body out of Axios's result
  const { data } = await api.post<LoginResponse>('/auth/login', { // because of baseURL in axios.ts, the request URL is https://fakestoreapi.com/auth/login
    username,
    password,
  })

  return data
}
