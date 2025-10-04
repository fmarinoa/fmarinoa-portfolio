import pino from 'pino'

const log = pino()

type ApiErrorProps = {
  error: unknown
  message?: string
}

const createJsonResponse = (data: object, status: number = 200): Response => {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const handleError = ({
  error,
  message = 'Internal Server Error',
}: ApiErrorProps): Response => {
  log.error(error, message)
  return createJsonResponse({ error: message }, 500)
}

export const handleBadRequest = ({
  error,
  message = 'Bad Request',
}: ApiErrorProps): Response => {
  log.warn(error, message)
  return createJsonResponse({ error: message }, 400)
}

export const handleNotFound = ({
  error,
  message = 'Not Found',
}: ApiErrorProps): Response => {
  log.error(error, message)
  return createJsonResponse({ error: message }, 404)
}

export const handleUnauthorized = ({
  error,
  message = 'Unauthorized',
}: ApiErrorProps): Response => {
  log.error(error, message)
  return createJsonResponse({ error: message }, 401)
}

export const handleForbidden = ({
  error,
  message = 'Forbidden',
}: ApiErrorProps): Response => {
  log.error(error, message)
  return createJsonResponse({ error: message }, 403)
}

export const handleSuccess = (data: object): Response => {
  log.info(data, 'Successful response')
  return createJsonResponse(data, 200)
}
