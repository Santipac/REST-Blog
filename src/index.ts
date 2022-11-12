/* eslint-disable import/first */
import dotenv from 'dotenv'
dotenv.config()
import config from './config'
import express from 'express'
import postRoutes from './routes/posts.routes'
import userRoutes from './routes/users.routes'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { dbConnection } from './database'

// Prisma instance
export const prisma = new PrismaClient()
// Server
const server = express()

// DB connection
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
server.use(express.urlencoded({ extended: true }))

// Routes
server.use('/api/posts', postRoutes)
server.use('/api/users', userRoutes)

server.listen(config.PORT, () => {
  console.clear()
  console.log(`🚀 Server listening on port ${config.PORT}`)
})
