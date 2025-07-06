import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hapus semua user, about, project, contactmessage, message
  await prisma.message.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.about.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN',
      image: 'https://ui-avatars.com/api/?name=Admin',
    },
  })

  // Seed user biasa (Google login, tanpa password)
  await prisma.user.create({
    data: {
      name: 'User Biasa',
      email: 'user@example.com',
      role: 'USER',
      image: 'https://ui-avatars.com/api/?name=User+Biasa',
    },
  })

  // Seed about
  await prisma.about.create({
    data: {
      name: 'John Doe',
      title: 'Full-Stack Developer',
      bio: 'Passionate developer with 5+ years of experience in building modern web applications.',
      email: 'john.doe@example.com',
      location: 'San Francisco, CA',
      image: 'https://ui-avatars.com/api/?name=John+Doe',
    },
  })

  // Seed projects
  await prisma.project.create({
    data: {
      title: 'Portfolio Website',
      description: 'A modern portfolio website with dynamic content management, real-time chat, and admin dashboard.',
      image: 'https://via.placeholder.com/600x400',
      githubUrl: 'https://github.com/johndoe/portfolio',
      liveUrl: 'https://portfolio-demo.com',
      technologies: ['Next.js', 'Prisma', 'NextAuth', 'Socket.IO'],
    },
  })

  await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with Next.js, Stripe, and PostgreSQL.',
      image: 'https://via.placeholder.com/600x400',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      liveUrl: 'https://ecommerce-demo.com',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 