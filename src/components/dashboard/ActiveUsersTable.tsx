import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activeUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    activity: "Opened 5 newsletters",
    score: 95,
    status: "highly_active",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    activity: "Clicked 8 links",
    score: 88,
    status: "active",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    activity: "Shared 2 newsletters",
    score: 82,
    status: "active",
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    email: "alex@example.com",
    activity: "Subscribed recently",
    score: 76,
    status: "moderate",
  },
  {
    id: 5,
    name: "Lisa Park",
    email: "lisa@example.com",
    activity: "Opened 3 newsletters",
    score: 71,
    status: "moderate",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "highly_active":
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Highly Active</Badge>;
    case "active":
      return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Active</Badge>;
    case "moderate":
      return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Moderate</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export function ActiveUsersTable() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Most Active Users
          <Badge variant="secondary" className="ml-auto">
            Top 5
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.activity}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.score}</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
                {getStatusBadge(user.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}