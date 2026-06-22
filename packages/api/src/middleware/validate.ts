import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export default function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(422).json({ error: result.error.flatten() })
      return
    }
    req.body = result.data
    next()
  }
}
