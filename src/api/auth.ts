type LoginResponse = {
  token: string
}

const MOCK_USER = {
  email: 'test@test.com',
  password: 'password',
}

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return { token: 'fake-jwt-token-123' }
  }

  throw new Error('Invalid email or password')
}
