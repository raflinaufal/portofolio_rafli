'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { 
  Settings, 
  MessageSquare, 
  FolderOpen, 
  User, 
  Github, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Folder,
  MessageCircle,
  BarChart3,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface DashboardStats {
  projects: number
  messages: number
  skills: number
  experiences: number
}

function GithubContributions({ username }: { username: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}.json`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, [username]);

  if (!username) return null;
  return (
    <div className="bg-card rounded-lg p-4 border mt-8">
      <div className="font-bold mb-2">GitHub Contributions</div>
      {loading && <div className="text-muted-foreground text-sm">Loading...</div>}
      {!loading && data && data.years && (
        <div className="overflow-x-auto">
          <div className="flex flex-col gap-2">
            {data.years[0]?.contributions.map((week: any, i: number) => (
              <div key={i} className="flex gap-1">
                {week.map((day: any, j: number) => (
                  <div
                    key={j}
                    title={`${day.count} contributions on ${day.date}`}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      background:
                        day.count === 0
                          ? '#161b22'
                          : day.count < 2
                          ? '#9be9a8'
                          : day.count < 4
                          ? '#40c463'
                          : day.count < 7
                          ? '#30a14e'
                          : '#216e39',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            <span className="font-semibold">{data.years[0]?.total}</span> contributions in the last year
          </div>
        </div>
      )}
      {!loading && !data && (
        <div className="text-muted-foreground text-sm">No data found.</div>
      )}
    </div>
  );
}

function GithubRepos({ username }: { username: string }) {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!username) return;
    setLoading(true);
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`)
      .then(res => res.json())
      .then(data => {
        setRepos(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, [username]);
  if (!username) return null;
  return (
    <div className="bg-card rounded-lg p-4 border mt-8">
      <div className="font-bold mb-2">Latest GitHub Repositories</div>
      {loading ? <div className="text-muted-foreground text-sm">Loading...</div> : (
        <ul className="space-y-2">
          {repos.map(repo => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener" className="font-semibold hover:underline">
                {repo.name}
              </a>
              <div className="text-xs text-muted-foreground">{repo.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch username dari profil/about
    fetch("/api/dashboard/about")
      .then(res => res.json())
      .then(data => {
        setGithubUsername(data?.githubUsername || "raflinaufal");
      });
  }, []);

  useEffect(() => {
    if (!githubUsername) return;
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => setRepos(data));
  }, [githubUsername]);

  return (
    <div className="max-w-4xl w-full mx-auto py-8 px-2 md:px-4 space-y-8">
      {/* Repo Populer */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Popular Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block border rounded-lg p-4 hover:bg-muted transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{repo.name}</span>
                <Badge variant="outline">{repo.private ? "Private" : "Public"}</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {repo.language && (
                  <span>{repo.language}</span>
                )}
                <span>★ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      </Card>

      {/* Chart Kontribusi */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">GitHub Contributions</h2>
        <div className="flex flex-col items-center gap-4">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            @{githubUsername}
          </a>
          <div className="overflow-x-auto rounded-lg border bg-background p-4">
            <img
              src={`https://ghchart.rshah.org/${githubUsername}`}
              alt="GitHub Contributions Chart"
              className="w-full max-w-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 