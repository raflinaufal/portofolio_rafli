"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Calendar, Github, Linkedin, Instagram } from "lucide-react";

export default function DashboardPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [profile, setProfile] = useState<{
    name?: string;
    image?: string;
    bio?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch githubUsername dari about, lalu fetch repos dari GitHub API
  useEffect(() => {
    setLoading(true);
    fetch("/api/dashboard/about")
      .then((res) => res.json())
      .then((data) => {
        const username = data?.githubUsername || "raflinaufal";
        setGithubUsername(username);
        setProfile({
          name: data?.name,
          image: data?.image,
          bio: data?.bio,
          github: data?.github,
          instagram: data?.instagram,
          linkedin: data?.linkedin,
        });
        // Fetch repos
        fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        )
          .then((res) => res.json())
          .then((repos) => {
            if (Array.isArray(repos)) setRepos(repos);
            else setRepos([]);
            setLoading(false);
          })
          .catch(() => {
            setRepos([]);
            setLoading(false);
          });
      })
      .catch(() => {
        setGithubUsername("");
        setRepos([]);
        setLoading(false);
      });
  }, []);

  const getLanguageColor = (language: string) => {
    const colors = {
      TypeScript: "bg-blue-500",
      Python: "bg-yellow-500",
      HTML: "bg-orange-500",
      JavaScript: "bg-yellow-400",
      CSS: "bg-purple-500",
      Java: "bg-red-500",
    };
    return colors[language as keyof typeof colors] || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-card border border-border">
              <CardContent className="p-8 text-center">
                {profile && (
                  <>
                    <Avatar className="w-32 h-32 mx-auto mb-6">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback className="text-4xl font-bold bg-muted text-muted-foreground">
                        {profile.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                    <div className="flex flex-col  gap-2 mt-10">
                      {profile.github && (
                        <a
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex  gap-2 text-blue-400 hover:underline rounded-md px-3 py-1 bg-muted/60 dark:bg-muted/80"
                        >
                          <Github className="w-5 h-5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {profile.linkedin && (
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex  gap-2 text-blue-300 hover:underline rounded-md px-3 py-1 bg-muted/60 dark:bg-muted/80"
                        >
                          <Linkedin className="w-5 h-5" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {profile.instagram && (
                        <a
                          href={profile.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex  gap-2 text-pink-400 hover:underline rounded-md px-3 py-1 bg-muted/60 dark:bg-muted/80"
                        >
                          <Instagram className="w-5 h-5" />
                          <span>Instagram</span>
                        </a>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Popular Repositories (dinamis dari GitHub API) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <Card className="bg-card border border-border">
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center justify-between">
                  Popular Repositories
                  <span className="text-sm font-normal text-gray-400">
                    {repos.length} total
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div>Loading...</div>
                ) : repos.length === 0 ? (
                  <div className="text-gray-400">No repositories found.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo) => (
                      <Card
                        key={repo.id}
                        className="bg-muted border border-border group"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-blue-400 truncate flex items-center gap-2">
                              {repo.name}
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-xs border border-border text-foreground"
                            >
                              {repo.private ? "Private" : "Public"}
                            </Badge>
                          </div>
                          {repo.description && (
                            <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                              {repo.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-3 h-3 rounded-full ${getLanguageColor(
                                    repo.language
                                  )}`}
                                ></div>
                                <span>{repo.language}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                <span>{repo.stargazers_count}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {repo.updated_at
                                  ? formatDate(repo.updated_at)
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Contribution Chart */}
        {githubUsername && (
          <Card className="bg-card border border-border p-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                GitHub Contributions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col items-center">
                <div className="overflow-x-auto rounded-lg border bg-background border-border w-full">
                  <img
                    src={`https://ghchart.rshah.org/${githubUsername}`}
                    alt="GitHub Contributions Chart"
                    className="w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
