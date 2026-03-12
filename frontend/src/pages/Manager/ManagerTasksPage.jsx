import { useEffect, useState } from "react";
import ManagerPage from "@/components/layout/ManagerPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

const defaultFilters = {
  employee_id: "",
  status: "",
  priority: "",
  source: "",
};

export default function ManagerTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  async function fetchEmployees() {
    const res = await api.get("/employees");
    setEmployees(res.data || []);
  }

  async function fetchTasks() {
    try {
      setLoading(true);
      const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value));
      const res = await api.get("/tasks", { params });
      setTasks(res.data || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(taskId, status) {
    await api.put(`/tasks/${taskId}`, { status });
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status } : task)));
  }

  return (
    <ManagerPage title="Vue unifiee des taches">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.employee_id}
            onChange={(e) => setFilters((prev) => ({ ...prev, employee_id: e.target.value }))}
          >
            <option value="">Tous les employes</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>

          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
          >
            <option value="">Tous les statuts</option>
            <option value="todo">todo</option>
            <option value="in_progress">in_progress</option>
            <option value="done">done</option>
          </select>

          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.priority}
            onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
          >
            <option value="">Toutes priorites</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <select
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={filters.source}
            onChange={(e) => setFilters((prev) => ({ ...prev, source: e.target.value }))}
          >
            <option value="">Toutes sources</option>
            <option value="internal">internal</option>
            <option value="jira">jira</option>
          </select>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Liste des taches</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-slate-500">Chargement...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-500">Aucune tache trouvee.</p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{task.title}</p>
                      <p className="text-sm text-slate-500">
                        {task.user?.name || "N/A"} - {task.priority} - {task.source}
                      </p>
                    </div>
                    <select
                      className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm md:w-44"
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="todo">todo</option>
                      <option value="in_progress">in_progress</option>
                      <option value="done">done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </ManagerPage>
  );
}
