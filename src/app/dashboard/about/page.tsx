import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { About, Experience, Skill } from "@/types/about";

// Types


export default function DashboardAboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard/about");
        const data = await res.json();
        setAbout(data.about);
        setSkills(data.skills);
        setExperiences(data.experiences);
      } catch (err) {
        toast({ title: "Failed to load About data", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>Admin profile information</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-24 w-full" />
          ) : about ? (
            <div className="space-y-2">
              <div>
                <strong>Name:</strong> {about.name}
              </div>
              <div>
                <strong>Title:</strong> {about.title}
              </div>
              <div>
                <strong>Bio:</strong> {about.bio}
              </div>
              <div>
                <strong>Email:</strong> {about.email}
              </div>
              <div>
                <strong>Location:</strong> {about.location}
              </div>
              <div>
                <strong>GitHub:</strong> {about.githubUsername}
              </div>
              <div>
                <strong>Instagram:</strong> {about.instagram}
              </div>
              <div>
                <strong>LinkedIn:</strong> {about.linkedin}
              </div>
            </div>
          ) : (
            <div>No about data found.</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
          <CardDescription>Manage your skills</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <DataTable
              columns={[
                { accessorKey: "name", header: "Name" },
                { accessorKey: "category", header: "Category" },
                { accessorKey: "proficiency", header: "Proficiency (%)" },
              ]}
              data={skills}
            />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience</CardTitle>
          <CardDescription>Manage your experiences</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : (
            <DataTable
              columns={[
                { accessorKey: "position", header: "Position" },
                { accessorKey: "company", header: "Company" },
                { accessorKey: "startDate", header: "Start Date" },
                { accessorKey: "endDate", header: "End Date" },
                { accessorKey: "isCurrent", header: "Current" },
              ]}
              data={experiences}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
