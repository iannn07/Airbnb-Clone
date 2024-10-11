const url = 'https://www.course-api.com/react-tours-project'

type Tour = {
  id: string
  name: string
  info: string
  image: string
  price: string
}

export async function fetchTours() {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  const response = await fetch(url)
  const data: Tour[] = await response.json()

  if (!data) return null

  return data
}
