
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Users } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/utils/variables";

type Newsletter = {
  id: string | number;
  title: string;
  sentDate?: string | null;
  openRate?: number | null;
  subscribers: number;
  status: "sent" | "draft" | "scheduled" | string;
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "sent":
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

export function NewslettersList() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/newsletters`);
      // Adjust if your API shape is different
      const items = res.data.data || res.data; 
      // show only 5 most recent, sorted by date if available
      const sorted = items.sort(
        (a: Newsletter, b: Newsletter) =>
          new Date(b.sentDate || "").getTime() -
          new Date(a.sentDate || "").getTime()
      );
      setNewsletters(sorted.slice(0, 5));
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

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
            <div
              key={newsletter.id}
              className="flex items-center space-x-4 p-3 rounded-lg border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {newsletter.title}
                  </p>
                  {getStatusBadge(newsletter.status)}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {newsletter.sentDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(newsletter.sentDate).toLocaleDateString()}
                    </div>
                  )}
                  {newsletter.openRate !== null && newsletter.openRate !== undefined && (
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
          {newsletters.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No newsletters available.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
