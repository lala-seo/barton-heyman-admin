
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { BASE_URL } from "@/utils/variables";

type Subscriber = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string; // if your API returns a timestamp
};

const getStatusBadge = (index: number) => {
  // Example: you can base status on recency or random scoring
  switch (index) {
    case 0:
      return <Badge className="bg-success/10 text-success hover:bg-success/20">New</Badge>;
    default:
      return <Badge variant="secondary">Recent</Badge>;
  }
};

export function ActiveUsersTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/subscribers`);
      // Assuming response is like { data: [...], total: number }
      setSubscribers(res.data.data.slice(0, 5)); // show only 5 most recent
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Subscribers
          <Badge variant="secondary" className="ml-auto">
            Latest 5
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.map((user, index) => (
            <div key={user.id} className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {`${user.email?.[0] || ""}${user.lastName?.[0] || ""}`}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(index)}
              </div>
            </div>
          ))}
          {subscribers.length === 0 && (
            <p className="text-sm text-muted-foreground">No subscribers yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
