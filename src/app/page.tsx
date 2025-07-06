"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeContent } from "@/lib/slices/homeContentSlice";
import { fetchLatestProjects } from "@/lib/slices/projectSlice";
import { RootState } from "@/lib/store";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Coffee } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const TypedText = dynamic(() => import('@/components/TypedText'), { ssr: false })

export default function HomePage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.homeContent);
  const { data: projects, loading: loadingProjects, error: errorProjects } = useSelector((state: RootState) => state.project);
  const [projectIdx, setProjectIdx] = useState(0);

  useEffect(() => {
    dispatch(fetchHomeContent() as any);
    dispatch(fetchLatestProjects() as any);
  }, [dispatch]);

  const content = data[0];

  // Slider logic
  const nextProject = () => setProjectIdx(i => (i + 1) % projects.length);
  const prevProject = () => setProjectIdx(i => (i - 1 + projects.length) % projects.length);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative text-center mb-16">
          {/* Icon pojok kanan atas */}
          <div className="absolute right-0 top-0 mr-2 mt-2 text-2xl text-muted-foreground">
            <Coffee />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 inline-block">
            <TypedText text={content?.title || "Kosong"} />
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-4 text-muted-foreground text-lg">
            {content?.isRemote && <span>• Remote worker</span>}
            {content?.location && <span>• Based in {content.location}</span>}
          </div>
          <p className="text-lg md:text-xl text-foreground/80 dark:text-foreground/70 mb-8 max-w-3xl mx-auto">
            {content?.description || 'kosong'}
          </p>
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}
        </div>

        {/* Latest Project Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center tracking-tight">Latest Portfolio</h2>
          {loadingProjects && <div className="text-center">Loading projects...</div>}
          {errorProjects && <div className="text-center text-red-500">Error: {errorProjects}</div>}
          {projects.length > 0 && (
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {projects.map((project, idx) => (
                  <CarouselItem key={project.id} className="md:basis-1/3">
                    <Card className="shadow-xl border-2 border-muted bg-card/80 dark:bg-card/60 flex flex-col h-full">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-semibold mb-1">{project.title}</CardTitle>
                        <CardDescription className="text-base text-muted-foreground mb-2 line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        {project.image && (
                          <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-muted flex items-center justify-center">
                            <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 hover:scale-105" />
                          </div>
                        )}
                        <div className="flex gap-2 flex-wrap mb-4">
                          {project.technologies?.map((tech: string) => (
                            <span key={tech} className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium border border-primary/20 shadow-sm">{tech}</span>
                          ))}
                        </div>
                        <div className="flex gap-4 mt-auto">
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" className="underline text-sm hover:text-primary">GitHub</Link>
                          )}
                          {project.liveUrl && (
                            <Link href={project.liveUrl} target="_blank" className="underline text-sm hover:text-primary">Live Demo</Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <div className="flex justify-center gap-4 mt-6">
                <CarouselPrevious />
                <CarouselNext />
              </div> */}
            </Carousel>
          )}
          {projects.length === 0 && !loadingProjects && <div className="text-center text-muted-foreground">No projects found.</div>}
        </div>

      </main>
    </div>
  )
}
