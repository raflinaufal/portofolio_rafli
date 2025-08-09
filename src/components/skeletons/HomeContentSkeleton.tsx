import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus, Search } from "lucide-react";

export function HomeContentSkeleton() {
  // Match ServiceSkeleton layout and column widths
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Skeleton className="pl-8 w-[300px] h-10 rounded-md" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Add New
          </Button>
          <Button
            disabled
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-6 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-32" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-6 w-24" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell className="flex gap-2 justify-end">
                  {[...Array(2)].map((_, j) => (
                    <Skeleton key={j} className="h-8 w-16 rounded-md" />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
