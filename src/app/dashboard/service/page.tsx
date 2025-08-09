"use client";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
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
import { ServiceSkeleton } from "@/components/skeletons/ServiceSkeleton";
import { ServiceForm } from "./ServiceForm";
import { useToast } from "@/hooks/use-toast";

import { fetchServices } from "@/lib/slices/serviceSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function ServicePage() {
  const dispatch = useAppDispatch();
  const {
    data: services,
    loading,
    error,
  } = useAppSelector((state) => state.service);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tools: "",
    icon: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState<any>({
    id: undefined,
    title: "",
    description: "",
    tools: "",
    icon: "",
  });
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create service");
      setForm({ title: "", description: "", tools: "", icon: "" });
      setOpen(false);
      toast({
        title: "Success",
        description: "Service created successfully.",
      });
      dispatch(fetchServices());
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (service: any) => {
    setEditForm(service);
    setEditOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/dashboard/service", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update service");
      setEditOpen(false);
      toast({
        title: "Success",
        description: "Service updated successfully.",
      });
      dispatch(fetchServices());
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/dashboard/service", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId }),
      });
      if (!res.ok) throw new Error("Failed to delete service");
      setDeleteOpen(false);
      setDeleteId(null);
      toast({
        title: "Success",
        description: "Service deleted successfully.",
      });
      dispatch(fetchServices());
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Service List</h1>
      {loading ? (
        <ServiceSkeleton />
      ) : (
        <DataTable
          data={services}
          columns={[
            ...Object.keys(services[0] || {}).map((key) => ({
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
          searchKey="title"
          onAdd={() => setOpen(true)}
        />
      )}
      {/* Create Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Service</DialogTitle>
          </DialogHeader>
          <ServiceForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <ServiceForm
            form={editForm}
            onChange={handleEditChange}
            onSubmit={handleEditSubmit}
            submitting={submitting}
            submitLabel="Update"
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this service?</p>
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
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
}
