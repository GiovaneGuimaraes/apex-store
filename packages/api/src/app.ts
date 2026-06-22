import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import categoryRoutes from './routes/categories'
import cartRoutes from './routes/cart'
import orderRoutes from './routes/orders'
import reviewRoutes from './routes/reviews'
import userRoutes from './routes/users'
import errorHandler from './middleware/errorHandler'

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
app.use(morgan('dev'))
app.use(express.json())

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 })
app.use('/api', limiter)

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

const PORT = parseInt(process.env.PORT ?? '3333')
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))

export default app
