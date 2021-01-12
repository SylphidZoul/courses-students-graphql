const errorHandler = (errorMessage: string, error?: Error): never => {
  const toBeLogged = error ? error : errorMessage
  const toBeReturned = error ? 'There was an internal error.' : errorMessage
  console.error(toBeLogged)

  throw new Error(toBeReturned)
}

export default errorHandler