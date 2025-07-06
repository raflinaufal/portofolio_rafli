"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface HomeContent {
  id: number;
  name: string;
  title: string;
  location: string;
  isRemote: boolean;
  description: string;
  updatedAt: string;
}

export default function HomeContentPage() {
  const [data, setData] = useState<HomeContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<HomeContent | null>(null);
  const [form, setForm] = useState({
    name: "",
    title: "",
    location: "",
    isRemote: false,
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch("/api/dashboard/home")
      .then((res) => res.json())
      .then((res) => {
        setData(res.homeContent || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setForm({ name: "", title: "", location: "", isRemote: false, description: "" });
    setOpen(true);
  };

  const handleEdit = (row: HomeContent) => {
    setEditData(row);
    setForm({
      name: row.name,
      title: row.title,
      location: row.location,
      isRemote: row.isRemote,
      description: row.description,
    });
    setOpen(true);
  };

  const handleDelete = async (row: HomeContent) => {
    if (confirm("Yakin hapus data ini?")) {
      await fetch(`/api/dashboard/home/${row.id}`, { method: "DELETE" });
      toast({ title: "Berhasil dihapus", description: row.title });
      fetchData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editData) {
        // Update
        await fetch("/api/dashboard/home", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editData.id, ...form }),
        });
        toast({ title: "Berhasil diupdate", description: form.title });
      } else {
        // Create
        await fetch("/api/dashboard/home", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        toast({ title: "Berhasil ditambahkan", description: form.title });
      }
      setOpen(false);
      fetchData();
    } catch (err) {
      toast({ title: "Gagal menyimpan data", description: String(err), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const columns: ColumnDef<HomeContent>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "isRemote", header: "Remote", cell: ({ getValue }) => getValue() ? "Yes" : "No" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "updatedAt", header: "Updated At", cell: ({ getValue }) => new Date(getValue() as string).toLocaleString() },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEdit(row.original)}><Pencil className="w-4 h-4" /></Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(row.original)}><Trash2 className="w-4 h-4" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Content</h1>
      <DataTable columns={columns} data={data} onAdd={handleAdd} />
      {loading && <div>Loading...</div>}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{editData ? "Edit Home Content" : "Create Home Content"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Input
                placeholder="Name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <Input
                placeholder="Title"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required
              />
              <Input
                placeholder="Location"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                required
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isRemote"
                  checked={form.isRemote}
                  onChange={e => setForm(f => ({ ...f, isRemote: e.target.checked }))}
                />
                <label htmlFor="isRemote">Remote Worker</label>
              </div>
              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : (editData ? "Update" : "Create")}</Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
} 