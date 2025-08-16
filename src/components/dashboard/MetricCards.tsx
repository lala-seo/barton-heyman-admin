

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { TrendingUp, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/variables";

export function MetricCards() {
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [totalNews, setTotalNews] = useState(0);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/subscribers`);
      setTotalSubscribers(res.data.total); 
    } catch (error) {
      console.error("Error fetching subscribers", error);
    }
  };

  const fetchNewsletters = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/newsletters`);
      setTotalNews(res.data.total); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubscribers();
    fetchNewsletters();
  }, []);

  const metrics = [
    {
      title: "Total Subscribers",
      value: totalSubscribers,
      change: "+12.3%",
      changeType: "increase" as const,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Newsletters",
      value: totalNews,
      change: "+8.1%",
      changeType: "increase" as const,
      icon: Mail,
      color: "text-accent",
    },
    
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card
          key={metric.title}
          className="card-metric animate-slide-up"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-5 w-5 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  metric.changeType === "increase"
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {metric.change}
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
