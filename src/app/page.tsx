import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getHomeContent() {
  try {
    const content = await prisma.homeContent.findFirst()
    return content
  } catch (error) {
    console.error('Error fetching home content:', error)
    return null
  }
}

export default async function HomePage() {
  const content = await getHomeContent()

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {content?.title || 'Welcome to My Portfolio'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            {content?.subtitle || 'Full-Stack Developer & Creative Problem Solver'}
          </p>
          <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
            {content?.description || 'I create beautiful, functional, and user-centered digital experiences. With a passion for clean code and innovative solutions, I bring ideas to life through modern web technologies.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg" className="text-lg px-8 py-3">
                {content?.ctaText || 'View My Work'}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Web Development</CardTitle>
              <CardDescription>
                Modern, responsive websites built with the latest technologies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From simple landing pages to complex web applications, I create solutions that work seamlessly across all devices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile Development</CardTitle>
              <CardDescription>
                Cross-platform mobile apps that deliver exceptional user experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Building native and hybrid mobile applications that users love to interact with.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UI/UX Design</CardTitle>
              <CardDescription>
                User-centered design that combines aesthetics with functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Creating intuitive interfaces that enhance user experience and drive engagement.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Let's work together to bring your ideas to life
          </p>
          <Link href="/contact">
            <Button size="lg" className="text-lg px-8 py-3">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
