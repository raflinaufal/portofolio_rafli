import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { prisma } from '@/lib/prisma'
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react'

async function getAboutData() {
  try {
    const [aboutContent, skills, experiences] = await Promise.all([
      prisma.aboutContent.findFirst(),
      prisma.skill.findMany({
        orderBy: { category: 'asc' }
      }),
      prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
      })
    ])
    
    return { aboutContent, skills, experiences }
  } catch (error) {
    console.error('Error fetching about data:', error)
    return { aboutContent: null, skills: [], experiences: [] }
  }
}

export default async function AboutPage() {
  const { aboutContent, skills, experiences } = await getAboutData()

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof skills>)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutContent?.bio || 'Passionate developer with a love for creating meaningful digital experiences.'}
          </p>
        </div>

        {/* Personal Info */}
        {aboutContent && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">{aboutContent.name}</CardTitle>
              <CardDescription className="text-lg">{aboutContent.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span>{aboutContent.email}</span>
                  </div>
                  {aboutContent.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <span>{aboutContent.phone}</span>
                    </div>
                  )}
                  {aboutContent.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500" />
                      <span>{aboutContent.location}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {aboutContent.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <a href={aboutContent.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {aboutContent.website}
                      </a>
                    </div>
                  )}
                  {aboutContent.github && (
                    <div className="flex items-center space-x-3">
                      <Github className="h-5 w-5 text-gray-500" />
                      <a href={aboutContent.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        GitHub
                      </a>
                    </div>
                  )}
                  {aboutContent.linkedin && (
                    <div className="flex items-center space-x-3">
                      <Linkedin className="h-5 w-5 text-gray-500" />
                      <a href={aboutContent.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Skills */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-gray-500">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Experience</h2>
          <div className="space-y-6">
            {experiences.map((experience) => (
              <Card key={experience.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{experience.position}</CardTitle>
                      <CardDescription className="text-lg">{experience.company}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {new Date(experience.startDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        })} - {experience.isCurrent ? 'Present' : experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short' 
                        }) : 'Present'}
                      </p>
                      {experience.isCurrent && (
                        <Badge variant="secondary" className="mt-1">Current</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{experience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 