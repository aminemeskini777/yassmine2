import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeDashboard() {
  return (
    <div className="flex">
      <Sidebar role="employee" />

      <div className="flex-1 bg-gray-100 dark:bg-gray-950 min-h-screen">
        <Navbar title="Employee Dashboard" />

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-gray-500">My Tasks</h3>
              <p className="text-3xl font-bold mt-2">8</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-gray-500">Completed</h3>
              <p className="text-3xl font-bold mt-2">15</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}