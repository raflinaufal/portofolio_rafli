"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  GitFork,
  RefreshCw,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

// Social Media Icons
<div className="flex flex-row items-center gap-4 mt-4 mb-4">
  <a
    href="https://github.com/raflinaufal"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <Github className="w-6 h-6 hover:text-primary transition" />
  </a>
  <a
    href="https://linkedin.com/in/raflinaufal"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <Linkedin className="w-6 h-6 hover:text-primary transition" />
  </a>
  <a
    href="https://instagram.com/raflinaufal"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <Instagram className="w-6 h-6 hover:text-primary transition" />
  </a>
</div>;
export default function DashboardPage() {
  const [githubUsername, setGithubUsername] = useState("");
  const [repos, setRepos] = useState<any[]>([]);
  const [profile, setProfile] = useState<{
    name?: string;
    image?: string;
    bio?: string;
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
        setProfile({ name: data?.name, image: data?.image, bio: data?.bio });
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
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">GitHub Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                {profile && (
                  <>
                    <Avatar className="w-32 h-32 mx-auto mb-6">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback className="text-4xl font-bold bg-gray-200 text-gray-800">
                        {profile.name
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
                    {profile.bio && (
                      <p className="text-sm text-gray-300 mb-4">
                        {profile.bio}
                      </p>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>
          {/* Popular Repositories (dinamis dari GitHub API) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <Card className="bg-gray-900 border-gray-800">
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
                        className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-blue-400 hover:text-blue-300 transition-colors truncate flex items-center gap-2">
                              {repo.name}
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <Badge
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300"
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
            {/* Contribution Chart */}
            {githubUsername && (
              <Card className="bg-gray-900 border-gray-800 p-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    GitHub Contributions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href={`https://github.com/${githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline mb-2"
                    >
                      @{githubUsername}
                    </a>
                    <div className="overflow-x-auto rounded-lg border bg-background p-4 w-full flex justify-center">
                      <img
                        src={`https://ghchart.rshah.org/${githubUsername}`}
                        alt="GitHub Contributions Chart"
                        className="w-full max-w-2xl min-w-[350px]"
                        loading="lazy"
                        style={{
                          background: "#161b22",
                          borderRadius: "8px",
                          padding: "8px",
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
