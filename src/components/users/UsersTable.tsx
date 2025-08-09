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
import { Eye, Edit, Trash2, Mail } from "lucide-react";

interface UsersTableProps {
  searchQuery: string;
}

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    status: "active",
    subscriptionDate: "2023-12-01",
    lastActivity: "2024-01-15",
    newslettersReceived: 23,
    openRate: 87,
    engagement: "high",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    status: "active",
    subscriptionDate: "2023-11-15",
    lastActivity: "2024-01-14",
    newslettersReceived: 28,
    openRate: 92,
    engagement: "high",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    status: "active",
    subscriptionDate: "2023-10-22",
    lastActivity: "2024-01-12",
    newslettersReceived: 35,
    openRate: 78,
    engagement: "high",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    status: "active",
    subscriptionDate: "2024-01-05",
    lastActivity: "2024-01-10",
    newslettersReceived: 8,
    openRate: 65,
    engagement: "medium",
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa@example.com",
    status: "inactive",
    subscriptionDate: "2023-09-10",
    lastActivity: "2023-12-20",
    newslettersReceived: 42,
    openRate: 23,
    engagement: "low",
  },
  {
    id: 6,
    name: "David Wilson",
    email: "david@example.com",
    status: "unsubscribed",
    subscriptionDate: "2023-08-15",
    lastActivity: "2023-11-30",
    newslettersReceived: 15,
    openRate: 45,
    engagement: "low",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>;
    case "inactive":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Inactive</Badge>;
    case "unsubscribed":
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Unsubscribed</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const getEngagementBadge = (engagement: string) => {
  switch (engagement) {
    case "high":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">High</Badge>;
    case "medium":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Medium</Badge>;
    case "low":
      return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Low</Badge>;
    default:
      return <Badge variant="secondary">-</Badge>;
  }
};

export function UsersTable({ searchQuery }: UsersTableProps) {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle>
          Users ({filteredUsers.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription Date</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Newsletters</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{new Date(user.subscriptionDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(user.lastActivity).toLocaleDateString()}</TableCell>
                  <TableCell>{user.newslettersReceived}</TableCell>
                  <TableCell>{user.openRate}%</TableCell>
                  <TableCell>{getEngagementBadge(user.engagement)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No users found matching your search.
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