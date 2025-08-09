import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import React from "react";

export interface ServiceFormProps {
  form: {
    title: string;
    description: string;
    tools: string;
    icon: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitLabel?: string;
}

export function ServiceForm({
  form,
  onChange,
  onSubmit,
  submitting,
  submitLabel = "Save",
}: ServiceFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
        required
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
        required
      />
      <Input
        name="tools"
        placeholder="Tools"
        value={form.tools}
        onChange={onChange}
        required
      />
      <Input
        name="icon"
        placeholder="Icon"
        value={form.icon}
        onChange={onChange}
        required
      />
      <DialogFooter>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitLabel}
        </Button>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </form>
  );
}
