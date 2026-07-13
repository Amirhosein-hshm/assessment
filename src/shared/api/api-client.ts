const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function apiClient<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json() as Promise<T>
}
