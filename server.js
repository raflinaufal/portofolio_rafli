const { createServer } = require('http')
const { Server } = require('socket.io')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('message', async (data) => {
    try {
      // Save message to database
      const message = await prisma.message.create({
        data: {
          content: data.content,
          userId: data.userId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      })

      const formattedMessage = {
        id: message.id,
        content: message.content,
        userId: message.userId,
        userName: message.user.name || 'Unknown',
        userImage: message.user.image || '',
        createdAt: message.createdAt.toISOString(),
      }

      // Broadcast message to all connected clients
      io.emit('message', formattedMessage)
    } catch (error) {
      console.error('Error saving message:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
}) 