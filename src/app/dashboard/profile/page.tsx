"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ProfileSkeleton } from "@/components/skeletons/ProfileSkeleton";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProfile } from "@/lib/slices/profileSlice";
import type { Profile } from "@/types/profile";

const PROFILE_FIELDS = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "bio", label: "Bio" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "image", label: "Image URL" },
  { key: "githubUsername", label: "GitHub Username" },
  { key: "github", label: "GitHub Link" },
  { key: "instagram", label: "Instagram Link" },
  { key: "linkedin", label: "LinkedIn Link" },
];

export default function ProfileDashboardPage() {
  const dispatch = useAppDispatch();
  const { data: about, loading } = useAppSelector((state) => state.profile);
  const [editField, setEditField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  async function handleEditSave() {
    if (!editField || !about) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...about, [editField]: editValue }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      toast({
        title: "Profile updated",
        description: `Field '${
          PROFILE_FIELDS.find((f) => f.key === editField)?.label
        }' updated successfully.`,
      });
      setEditField(null);
      setEditValue("");
      dispatch(fetchProfile());
    } catch (err: any) {
      toast({ title: "Error", description: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <ProfileSkeleton />;
  }
  if (!about) {
    return (
      <div className="text-center text-muted-foreground">
        No profile data found.
      </div>
    );
  }

  // Data untuk datatable
  const data = PROFILE_FIELDS.map((field) => {
    const value = (about as Record<string, any>)[field.key];
    return {
      field: field.label,
      value:
        field.key === "image" && value ? (
          <Avatar className="w-10 h-10">
            <AvatarImage src={value} alt="Profile" />
            <AvatarFallback>{about.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        ) : (
          value || <span className="text-muted-foreground">-</span>
        ),
      key: field.key,
      rawValue: value || "",
    };
  });

  // Kolom DataTable
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "field",
      header: "Field",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.field}</span>
      ),
    },
    {
      accessorKey: "value",
      header: "Value",
      cell: ({ row }) => (
        <div className="break-words max-w-xs">{row.original.value}</div>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setEditField(row.original.key);
            setEditValue(row.original.rawValue);
          }}
        >
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
      <Dialog
        open={!!editField}
        onOpenChange={(open) => {
          if (!open) setEditField(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit {PROFILE_FIELDS.find((f) => f.key === editField)?.label}
            </DialogTitle>
          </DialogHeader>
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={PROFILE_FIELDS.find((f) => f.key === editField)?.label}
            autoFocus
          />
          <DialogFooter>
            <Button onClick={handleEditSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
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
