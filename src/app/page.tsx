"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeContent } from "@/lib/slices/homeContentSlice";
import { RootState } from "@/lib/store";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Coffee } from 'lucide-react'

const TypedText = dynamic(() => import('@/components/TypedText'), { ssr: false })

export default function HomePage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.homeContent);

  useEffect(() => {
    dispatch(fetchHomeContent() as any);
  }, [dispatch]);

  const content = data[0];

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
      
      </main>
    </div>
  )
}
