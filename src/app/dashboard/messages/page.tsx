"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, Mail, MailOpen } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">
        {row.getValue("message")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "unread"
              ? "destructive"
              : status === "read"
              ? "secondary"
              : "default"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const message = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <Eye className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost">
            <Mail className="h-4 w-4" />
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
const mockMessages: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Collaboration",
    message: "Hi! I'm interested in collaborating on a new project. I've seen your portfolio and I think we could work well together. Would you be available for a call next week?",
    status: "unread",
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@company.com",
    subject: "Job Opportunity",
    message: "We're looking for a talented developer to join our team. Your portfolio caught our attention. Are you currently open to new opportunities?",
    status: "read",
    createdAt: "2024-01-19T14:15:00Z",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.com",
    subject: "Freelance Work",
    message: "We need help with our website redesign. Your work looks great! Are you available for freelance projects?",
    status: "replied",
    createdAt: "2024-01-18T09:45:00Z",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily@agency.com",
    subject: "Partnership Proposal",
    message: "We'd like to discuss a potential partnership. Your skills align perfectly with our needs. Can we schedule a meeting?",
    status: "unread",
    createdAt: "2024-01-17T16:20:00Z",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@tech.com",
    subject: "Technical Consultation",
    message: "We're building a new platform and need technical guidance. Your experience with Next.js would be valuable.",
    status: "read",
    createdAt: "2024-01-16T11:10:00Z",
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddMessage = () => {
    // TODO: Implement compose message modal
    console.log("Compose new message");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading messages...</div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => m.status === "unread").length;
  const readCount = messages.filter(m => m.status === "read").length;
  const repliedCount = messages.filter(m => m.status === "replied").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Manage contact form messages and inquiries.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <MailOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-2xl font-bold">{messages.length}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-destructive" />
            <div>
              <div className="text-2xl font-bold">{unreadCount}</div>
              <div className="text-sm text-muted-foreground">Unread</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <MailOpen className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-2xl font-bold">{readCount}</div>
              <div className="text-sm text-muted-foreground">Read</div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-card rounded-lg border">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{repliedCount}</div>
              <div className="text-sm text-muted-foreground">Replied</div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={messages}
        searchKey="name"
        onAdd={handleAddMessage}
      />
    </div>
  );
} 