"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: "published" | "draft" | "archived";
  createdAt: string;
  updatedAt: string;
}

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "technologies",
    header: "Technologies",
    cell: ({ row }) => {
      const technologies = row.getValue("technologies") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{technologies.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "published"
              ? "default"
              : status === "draft"
              ? "secondary"
              : "destructive"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, TypeScript, and Prisma. Features include user authentication, product management, shopping cart, and payment integration.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    status: "published",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    status: "draft",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "A modern portfolio website with dynamic content management, dark mode, and responsive design.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    status: "published",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
  {
    id: "4",
    title: "Chat Application",
    description: "Real-time chat application with user authentication, message history, and file sharing capabilities.",
    technologies: ["React", "Firebase", "Socket.io", "Tailwind CSS"],
    status: "archived",
    createdAt: "2023-12-20",
    updatedAt: "2024-01-10",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddProject = () => {
    // TODO: Implement add project modal/form
    console.log("Add new project");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <p className="text-muted-foreground">
          Manage your portfolio projects and showcase your work.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold">{projects.length}</div>
          <div className="text-sm text-muted-foreground">Total Projects</div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold">
            {projects.filter(p => p.status === "published").length}
          </div>
          <div className="text-sm text-muted-foreground">Published</div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold">
            {projects.filter(p => p.status === "draft").length}
          </div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="text-2xl font-bold">
            {projects.filter(p => p.status === "archived").length}
          </div>
          <div className="text-sm text-muted-foreground">Archived</div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={projects}
        searchKey="title"
        onAdd={handleAddProject}
      />
    </div>
  );
} 