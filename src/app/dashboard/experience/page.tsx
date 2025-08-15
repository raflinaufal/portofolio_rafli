"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/ui/data-table";
import { Experience } from "@/types/about";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    position: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    aboutId: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({
    id: undefined,
    position: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    aboutId: 1,
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchExperiences = () => {
    setLoading(true);
    fetch("/api/dashboard/experience")
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data.experiences || []);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox" && "checked" in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/dashboard/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({
      position: "",
      company: "",
      description: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      aboutId: 1,
    });
    setOpen(false);
    setSubmitting(false);
    fetchExperiences();
  };

  const handleEditClick = (item: any) => {
    setEditForm(item);
    setEditOpen(true);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox" && "checked" in e.target) {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setEditForm((prev: any) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/dashboard/experience", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEditOpen(false);
    setSubmitting(false);
    fetchExperiences();
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    await fetch("/api/dashboard/experience", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deleteId }),
    });
    setDeleteOpen(false);
    setDeleteId(null);
    fetchExperiences();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Experience List</h1>
      {loading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <DataTable
          data={experiences}
          columns={[
            { accessorKey: "position", header: "Position" },
            { accessorKey: "company", header: "Company" },
            { accessorKey: "startDate", header: "Start Date" },
            { accessorKey: "endDate", header: "End Date" },
            { accessorKey: "isCurrent", header: "Current" },
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
          searchKey="position"
          onAdd={() => setOpen(true)}
        />
      )}
      {/* Create Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Experience</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="position"
              placeholder="Position"
              value={form.position}
              onChange={handleChange}
              required
            />
            <Input
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              required
            />
            <Input
              name="startDate"
              placeholder="Start Date"
              type="date"
              value={form.startDate}
              onChange={handleChange}
              required
            />
            <Input
              name="endDate"
              placeholder="End Date"
              type="date"
              value={form.endDate}
              onChange={handleChange}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCurrent"
                checked={form.isCurrent}
                onChange={handleChange}
                id="isCurrent"
              />
              <label htmlFor="isCurrent">Current</label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
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
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <Input
              name="position"
              placeholder="Position"
              value={editForm.position}
              onChange={handleEditChange}
              required
            />
            <Input
              name="company"
              placeholder="Company"
              value={editForm.company}
              onChange={handleEditChange}
              required
            />
            <Input
              name="startDate"
              placeholder="Start Date"
              type="date"
              value={editForm.startDate}
              onChange={handleEditChange}
              required
            />
            <Input
              name="endDate"
              placeholder="End Date"
              type="date"
              value={editForm.endDate}
              onChange={handleEditChange}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isCurrent"
                checked={editForm.isCurrent}
                onChange={handleEditChange}
                id="editIsCurrent"
              />
              <label htmlFor="editIsCurrent">Current</label>
            </div>
            <textarea
              name="description"
              placeholder="Description"
              value={editForm.description}
              onChange={handleEditChange}
              required
              className="w-full border rounded px-3 py-2"
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
            <DialogTitle>Delete Experience</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this experience?</p>
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
