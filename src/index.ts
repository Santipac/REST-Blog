/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import config from './config'
import express from 'express'

import cookieparser from 'cookie-parser'
import { verifyJWT } from './middlewares/verifyJWT'
import postRoutes from './routes/posts.routes'
import userRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Prisma instance
export const prisma = new PrismaClient()
// Server
const server = express()

// Middlewares
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieparser())

// Routes
server.use('/users', userRoutes)
server.use('/auth', authRoutes)
server.use(verifyJWT)
server.use('/posts', postRoutes)

server.listen(config.PORT, () => {
  console.clear()
  console.log(`🚀 Server listening on port ${config.PORT}`)
})
