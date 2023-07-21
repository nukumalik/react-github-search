export const fetcher = async (input: RequestInfo | URL, init?: RequestInit | undefined) => {
  return (
    await fetch(input, {
      ...init,
      headers: {
        ...init?.headers
      }
    })
  ).json()
}
