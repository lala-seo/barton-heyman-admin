import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsersTable } from "@/components/users/UsersTable";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";

const Subscribers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subsribers</h1>
          {/* <p className="text-muted-foreground">
            Manage your newsletter subscribers and their activity
          </p> */}
        </div>
        {/* <CreateUserDialog /> */}
      </div>

      {/* Filters */}
      {/* <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </Card> */}

      {/* Users Table */}
      <UsersTable searchQuery={searchQuery} />
    </div>
  );
};

export default Subscribers;