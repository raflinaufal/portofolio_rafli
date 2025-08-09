"use client";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HomeContentSkeleton } from "@/components/skeletons/HomeContentSkeleton";

export default function HomeContentPage() {
  const [homeContent, setHomeContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    location: "",
    isRemote: false,
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({
    id: undefined,
    name: "",
    title: "",
    location: "",
    isRemote: false,
    description: "",
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchHomeContent = () => {
    setLoading(true);
    fetch("/api/dashboard/home")
      .then((res) => res.json())
      .then((data) => {
        setHomeContent(data.homeContent || []);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchHomeContent();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/dashboard/home", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      name: "",
      title: "",
      location: "",
      isRemote: false,
      description: "",
    });
    setOpen(false);
    setSubmitting(false);
    fetchHomeContent();
  };

  const handleEditClick = (item: any) => {
    setEditForm(item);
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/dashboard/home", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditOpen(false);
    setSubmitting(false);
    fetchHomeContent();
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    await fetch("/api/dashboard/home", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    });
    setDeleteOpen(false);
    setDeleteId(null);
    fetchHomeContent();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home Content List</h1>
      {loading ? (
        <HomeContentSkeleton />
      ) : (
        <DataTable
          data={homeContent}
          columns={[
            ...Object.keys(homeContent[0] || {}).map((key) => ({
              accessorKey: key,
              header: key.charAt(0).toUpperCase() + key.slice(1),
            })),
            {
              accessorKey: "actions",
              header: "Actions",
              cell: ({ row }: any) => (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditClick(row.original)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteClick(row.original.id)}
                  >
                    Delete
                  </Button>
                </div>
              ),
            },
          ]}
          searchKey="name"
          onAdd={() => setOpen(true)}
        />
      )}
      {/* Create Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Home Content</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <Input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isRemote"
                checked={form.isRemote}
                onChange={handleChange}
                id="isRemote"
              />
              <label htmlFor="isRemote">Remote</label>
            </div>
            <Input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Home Content</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Name"
              value={editForm.name}
              onChange={handleEditChange}
              required
            />
            <Input
              name="title"
              placeholder="Title"
              value={editForm.title}
              onChange={handleEditChange}
              required
            />
            <Input
              name="location"
              placeholder="Location"
              value={editForm.location}
              onChange={handleEditChange}
              required
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isRemote"
                checked={editForm.isRemote}
                onChange={handleEditChange}
                id="editIsRemote"
              />
              <label htmlFor="editIsRemote">Remote</label>
            </div>
            <Input
              name="description"
              placeholder="Description"
              value={editForm.description}
              onChange={handleEditChange}
              required
            />
            <DialogFooter>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Home Content</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this home content?</p>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
