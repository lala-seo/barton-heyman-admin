import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BASE_URL } from "@/utils/variables";

interface UsersTableProps {
  searchQuery: string;
}

interface Subscriber {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  subscribedAt: string;
  emailsSent?: number;
  emailsOpened?: number;
  emailsClicked?: number;
}

export function UsersTable({ searchQuery }: UsersTableProps) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubscribers = async (page: number) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/subscribers?page=${page}&limit=10`
      );
      setSubscribers(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (error) {
      console.error("Error fetching subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers(page);
  }, [page]);

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-success/10 text-success hover:bg-success/20">
        Active
      </Badge>
    ) : (
      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">
        Inactive
      </Badge>
    );
  };

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>Subscribers ({filteredSubscribers.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emails</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Date</TableHead>
                {/* <TableHead>Emails Sent</TableHead>
                <TableHead>Emails Opened</TableHead>
                <TableHead>Emails Clicked</TableHead> */}
                 {/* <TableHead>Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                            {sub.fullName[0]?.toUpperCase() ||
                              sub.email[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{sub.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            {sub.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(sub.isActive)}</TableCell>
                    <TableCell>
                      {new Date(sub.subscribedAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4" />
                        </Button> */}
                        {/* <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No subscribers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Prev
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
