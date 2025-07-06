"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

const PROFILE_FIELDS = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "bio", label: "Bio" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "image", label: "Image URL" },
  { key: "githubUsername", label: "GitHub Username" },
];

export default function ProfileDashboardPage() {
  const { data: session } = useSession();
  const [about, setAbout] = useState<any>(null);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAbout();
  }, []);

  async function fetchAbout() {
    const res = await fetch("/api/dashboard/about");
    const data = await res.json();
    setAbout(data);
  }

  async function handleEditSave() {
    if (!editField) return;
    setLoading(true);
    await fetch("/api/dashboard/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...about, [editField]: editValue }),
    });
    setLoading(false);
    setEditField(null);
    setEditValue("");
    fetchAbout();
  }

  if (!about) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  // Data untuk datatable
  const data = PROFILE_FIELDS.map(field => ({
    field: field.label,
    value: field.key === "image" && about[field.key]
      ? <Avatar className="w-10 h-10"><AvatarImage src={about[field.key]} alt="Profile" /><AvatarFallback>{about.name?.[0] || "U"}</AvatarFallback></Avatar>
      : about[field.key] || <span className="text-muted-foreground">-</span>,
    key: field.key,
    rawValue: about[field.key] || "",
  }));

  // Kolom DataTable
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "field",
      header: "Field",
      cell: ({ row }) => <span className="font-medium">{row.original.field}</span>,
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => <div className="break-words max-w-xs">{row.original.value}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button size="sm" variant="outline" onClick={() => {
          setEditField(row.original.key);
          setEditValue(row.original.rawValue);
        }}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl w-full mx-auto py-8 px-2 md:px-4">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <DataTable columns={columns} data={data} />
      </Card>

      {/* Modal Edit */}
      <Dialog open={!!editField} onOpenChange={open => { if (!open) setEditField(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {PROFILE_FIELDS.find(f => f.key === editField)?.label}</DialogTitle>
          </DialogHeader>
          <Input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            placeholder={PROFILE_FIELDS.find(f => f.key === editField)?.label}
            autoFocus
          />
          <DialogFooter>
            <Button onClick={handleEditSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setEditField(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 