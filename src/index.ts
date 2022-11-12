import dotenv from 'dotenv'
import config from './config'
import express from 'express'
import postRoutes from './routes/posts.controller'
import userRoutes from './routes/users.controller'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { dbConnection } from './database'
dotenv.config()

// Prisma instance
export const prisma = new PrismaClient()
// Server
const server = express()

// Mongo connection
dbConnection()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })

// Middlewares
server.use(cors())
server.use(express.json())

// Routes
server.use('/api/posts', postRoutes)
server.use('/api/users', userRoutes)

server.listen(config.PORT, () => {
  console.clear()
  console.log(`🚀 Server listening on port ${config.PORT}`)
})
