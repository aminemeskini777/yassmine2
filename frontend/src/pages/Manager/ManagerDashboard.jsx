import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function ManagerDashboard() {
  return (
    <div className="flex">
      <Sidebar role="manager" />

      <div className="flex-1 bg-gray-100 dark:bg-gray-950 min-h-screen">
        <Navbar title="Manager Dashboard" />

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-gray-500">Total Employees</h3>
              <p className="text-3xl font-bold mt-2">24</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-gray-500">Active Tasks</h3>
              <p className="text-3xl font-bold mt-2">12</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-gray-500">Pending Requests</h3>
              <p className="text-3xl font-bold mt-2">5</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}