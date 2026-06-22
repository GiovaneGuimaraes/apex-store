import { Request, Response, NextFunction } from 'express'

interface HttpError extends Error {
  status?: number
  statusCode?: number
}

export default function errorHandler(
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.status ?? err.statusCode ?? 500
  const message = err.message ?? 'Internal Server Error'

  if (process.env.NODE_ENV !== 'production') console.error(err)

  res.status(status).json({ error: message })
}
