import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Mail, BarChart } from "lucide-react";

const metrics = [
  {
    title: "Total Subscribers",
    value: "12,459",
    change: "+12.3%",
    changeType: "increase" as const,
    icon: Users,
    color: "text-primary",
  },
  {
    title: "Newsletter Sent",
    value: "847",
    change: "+8.1%",
    changeType: "increase" as const,
    icon: Mail,
    color: "text-accent",
  },
  {
    title: "Open Rate",
    value: "68.4%",
    change: "+2.7%",
    changeType: "increase" as const,
    icon: TrendingUp,
    color: "text-success",
  },
];

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={metric.title} className="card-metric animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
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