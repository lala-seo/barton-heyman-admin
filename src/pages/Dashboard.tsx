import { MetricCards } from "@/components/dashboard/MetricCards";
import { ActiveUsersTable } from "@/components/dashboard/ActiveUsersTable";
import { NewslettersList } from "@/components/dashboard/NewslettersList";

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your newsletter performance and user engagement
        </p>
      </div>

      {/* Metrics Cards */}
      <MetricCards />

      {/* Active Users and Newsletters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActiveUsersTable />
        <NewslettersList />
      </div>
    </div>
  );
};

export default Dashboard;