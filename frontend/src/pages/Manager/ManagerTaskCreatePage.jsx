import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerPage from "@/components/layout/ManagerPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

export default function ManagerTaskCreatePage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    user_id: "",
    due_date: "",
    source: "internal",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const res = await api.get("/employees");
    setEmployees(res.data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/tasks", {
      ...form,
      user_id: Number(form.user_id),
    });
    navigate("/manager/tasks");
  }

  return (
    <ManagerPage title="Creer une tache">
      <Card className="max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>Nouvelle tache</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Titre</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Priorite</Label>
                <select
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={form.priority}
                  onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Employe assigne</Label>
                <select
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={form.user_id}
                  onChange={(e) => setForm((prev) => ({ ...prev, user_id: e.target.value }))}
                  required
                >
                  <option value="">Selectionner</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Date limite</Label>
                <Input
                  type="date"
                  value={form.due_date}
                  onChange={(e) => setForm((prev) => ({ ...prev, due_date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Source</Label>
                <select
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  value={form.source}
                  onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value }))}
                >
                  <option value="internal">internal</option>
                  <option value="jira">jira</option>
                </select>
              </div>
            </div>

            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Creer
            </Button>
          </form>
        </CardContent>
      </Card>
    </ManagerPage>
  );
}
