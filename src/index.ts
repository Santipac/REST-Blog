/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import config from './config'
import express from 'express'
import postRoutes from './routes/posts.routes'
import userRoutes from './routes/users.routes'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Prisma instance
export const prisma = new PrismaClient()
// Server
const server = express()

// Middlewares
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Routes
server.use('/posts', postRoutes)
server.use('/users', userRoutes)

server.listen(config.PORT, () => {
  console.clear()
  console.log(`🚀 Server listening on port ${config.PORT}`)
})
