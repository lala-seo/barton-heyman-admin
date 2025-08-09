import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Users } from "lucide-react";

const newsletters = [
  {
    id: 1,
    title: "Weekly Product Updates",
    sentDate: "2024-01-15",
    openRate: 72,
    subscribers: 1250,
    status: "sent",
  },
  {
    id: 2,
    title: "New Feature Announcement",
    sentDate: "2024-01-12",
    openRate: 68,
    subscribers: 1180,
    status: "sent",
  },
  {
    id: 3,
    title: "Customer Success Stories",
    sentDate: "2024-01-10",
    openRate: 75,
    subscribers: 1340,
    status: "sent",
  },
  {
    id: 4,
    title: "Monthly Newsletter Draft",
    sentDate: null,
    openRate: null,
    subscribers: 0,
    status: "draft",
  },
  {
    id: 5,
    title: "Holiday Special Offer",
    sentDate: "2024-01-08",
    openRate: 81,
    subscribers: 1420,
    status: "sent",
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

export function NewslettersList() {
  return (
    <Card className="card-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Recent Newsletters
          <Badge variant="secondary" className="ml-auto">
            Last 5
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div key={newsletter.id} className="flex items-center space-x-4 p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">{newsletter.title}</p>
                  {getStatusBadge(newsletter.status)}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {newsletter.sentDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(newsletter.sentDate).toLocaleDateString()}
                    </div>
                  )}
                  {newsletter.openRate && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {newsletter.openRate}% open rate
                    </div>
                  )}
                  {newsletter.subscribers > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {newsletter.subscribers} subscribers
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}