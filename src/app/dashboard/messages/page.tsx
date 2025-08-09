"use client";
import { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Eye, Mail, MailOpen } from "lucide-react";
import { MessagesSkeleton } from "@/components/skeletons/MessagesSkeleton";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchMessages } from "@/lib/slices/messagesSlice";
import type { Message } from "@/types/message";

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
      <div className="max-w-[300px] truncate">{row.getValue("message")}</div>
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

export default function MessagesPage() {
  const dispatch = useAppDispatch();
  const { data: messages, loading } = useAppSelector((state) => state.messages);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleAddMessage = () => {
    toast({
      title: "Not implemented",
      description: "Compose message modal coming soon.",
    });
  };

  if (loading) {
    return <MessagesSkeleton />;
  }

  const unreadCount = messages.filter((m) => m.status === "unread").length;
  const readCount = messages.filter((m) => m.status === "read").length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;

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
              <div className="text-sm text-muted-foreground">
                Total Messages
              </div>
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
