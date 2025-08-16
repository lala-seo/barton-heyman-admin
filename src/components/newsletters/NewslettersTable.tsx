
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { BASE_URL } from "@/utils/variables";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { UpdateNewsletterDialog } from "./UpdateNewsletterDialog";

interface NewslettersTableProps {
  searchQuery: string;
  statusFilter: string;
  dateFilter: string;
  typeFilter: string;
}

interface Newsletter {
  _id: string;
  title: string;
  subTitle?: string;
  type: string;
  featuredImage: string;
  author: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  id: string;
}

export function NewslettersTable({
  searchQuery,
  statusFilter,
  dateFilter,
  typeFilter,
}: NewslettersTableProps) {
  const { toast } = useToast();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNewsletters = async (pageNum = page) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/newsletters?page=${pageNum}&limit=10`);
      setNewsletters(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error: any) {
      toast({
        title: "Failed to Fetch Newsletters",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters(page);
  }, [page]);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await axios.delete(`${BASE_URL}/newsletters/${deleteId}`);
      toast({
        title: "Newsletter Deleted",
        description: "The newsletter has been removed successfully.",
        variant: "success",
      });
      setNewsletters((prev) => prev.filter((n) => n._id !== deleteId));
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
      case "published":
        return (
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            Sent
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
            Draft
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            Scheduled
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch =
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.subTitle?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || newsletter.status === statusFilter;
    const matchesType = typeFilter === "all" || newsletter.type === typeFilter;
    const matchesDate = dateFilter === "all";

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  return (
    <>
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Newsletters ({filteredNewsletters.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading newsletters...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Sub Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNewsletters.map((newsletter) => (
                    <TableRow key={newsletter._id}>
                      <TableCell>
                        <img
                          src={newsletter.featuredImage}
                          className="h-[50px] w-[50px] rounded object-contain"
                          alt=""
                        />
                      </TableCell>
                      <TableCell className="font-medium">{newsletter.title}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {newsletter.subTitle}
                      </TableCell>
                      <TableCell>{newsletter.type}</TableCell>
                      <TableCell>{getStatusBadge(newsletter.status)}</TableCell>
                      <TableCell>
                        {new Date(newsletter.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              setEditId(newsletter._id);
                              setEditOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => {
                              setDeleteId(newsletter._id);
                              setConfirmOpen(true);
                            }}
                            disabled={deleting}
                          >
                            {deleting && deleteId === newsletter._id
                              ? "Deleting..."
                              : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredNewsletters.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No newsletters found matching your criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>

      <UpdateNewsletterDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        newsletterId={editId}
        onUpdated={() => fetchNewsletters(page)}
      />

      {/* Confirm Delete Modal */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this newsletter?</p>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
