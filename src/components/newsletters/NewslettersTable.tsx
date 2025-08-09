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
import { Eye, Edit, Trash2, Send } from "lucide-react";

interface NewslettersTableProps {
  searchQuery: string;
  statusFilter: string;
  dateFilter: string;
}

const newsletters = [
  {
    id: 1,
    title: "Weekly Product Updates",
    subject: "Exciting new features this week!",
    status: "sent",
    sentDate: "2024-01-15",
    openRate: 72.5,
    clickRate: 18.3,
    subscribers: 1250,
  },
  {
    id: 2,
    title: "New Feature Announcement",
    subject: "Introducing our latest innovation",
    status: "sent",
    sentDate: "2024-01-12",
    openRate: 68.2,
    clickRate: 22.1,
    subscribers: 1180,
  },
  {
    id: 3,
    title: "Customer Success Stories",
    subject: "How our customers are winning",
    status: "sent",
    sentDate: "2024-01-10",
    openRate: 75.8,
    clickRate: 19.7,
    subscribers: 1340,
  },
  {
    id: 4,
    title: "Monthly Newsletter Draft",
    subject: "January roundup and insights",
    status: "draft",
    sentDate: null,
    openRate: null,
    clickRate: null,
    subscribers: 0,
  },
  {
    id: 5,
    title: "Holiday Special Offer",
    subject: "Limited time: 50% off everything!",
    status: "sent",
    sentDate: "2024-01-08",
    openRate: 81.2,
    clickRate: 34.6,
    subscribers: 1420,
  },
  {
    id: 6,
    title: "Welcome Series - Part 1",
    subject: "Welcome to our community!",
    status: "scheduled",
    sentDate: "2024-01-20",
    openRate: null,
    clickRate: null,
    subscribers: 150,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "sent":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Sent</Badge>;
    case "draft":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Draft</Badge>;
    case "scheduled":
      return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Scheduled</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export function NewslettersTable({ searchQuery, statusFilter, dateFilter }: NewslettersTableProps) {
  // Filter newsletters based on search query and filters
  const filteredNewsletters = newsletters.filter((newsletter) => {
    const matchesSearch = 
      newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      newsletter.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || newsletter.status === statusFilter;
    
    // Simple date filtering logic (you can expand this)
    const matchesDate = dateFilter === "all"; // For now, show all
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>
          Newsletters ({filteredNewsletters.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNewsletters.map((newsletter) => (
                <TableRow key={newsletter.id}>
                  <TableCell className="font-medium">{newsletter.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{newsletter.subject}</TableCell>
                  <TableCell>{getStatusBadge(newsletter.status)}</TableCell>
                  <TableCell>
                    {newsletter.sentDate 
                      ? new Date(newsletter.sentDate).toLocaleDateString()
                      : "-"
                    }
                  </TableCell>
                  <TableCell>
                    {newsletter.openRate ? `${newsletter.openRate}%` : "-"}
                  </TableCell>
                  <TableCell>
                    {newsletter.clickRate ? `${newsletter.clickRate}%` : "-"}
                  </TableCell>
                  <TableCell>{newsletter.subscribers}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {newsletter.status === "draft" && (
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredNewsletters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No newsletters found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}