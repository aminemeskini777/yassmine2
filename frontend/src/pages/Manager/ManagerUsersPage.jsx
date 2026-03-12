import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ManagerPage from "@/components/layout/ManagerPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

export default function ManagerUsersPage() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingStatus, setEditingStatus] = useState("active");

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const res = await api.get("/employees");
    setEmployees(res.data || []);
  }

  function startEdit(employee) {
    setEditingId(employee.id);
    setEditingName(employee.name);
    setEditingStatus(employee.status || "active");
  }

  async function saveEdit() {
    await api.put(`/employees/${editingId}`, {
      name: editingName,
      status: editingStatus,
    });
    setEditingId(null);
    await fetchEmployees();
  }

  async function removeEmployee(id) {
    await api.delete(`/employees/${id}`);
    await fetchEmployees();
  }

  return (
    <ManagerPage title="Utilisateurs / Employes">
      <div className="flex justify-end">
        <Link to="/manager/users/create">
          <Button className="bg-orange-600 hover:bg-orange-700">Creer employe</Button>
        </Link>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Liste des employes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {employees.map((employee) => (
              <div key={employee.id} className="rounded-xl border border-slate-200 p-3">
                {editingId === employee.id ? (
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                    <input
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                    <select
                      className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                      value={editingStatus}
                      onChange={(e) => setEditingStatus(e.target.value)}
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                    <Button onClick={saveEdit} className="bg-green-600 hover:bg-green-700">
                      Sauver
                    </Button>
                    <Button variant="outline" onClick={() => setEditingId(null)}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{employee.name}</p>
                      <p className="text-sm text-slate-500">
                        {employee.email} - {employee.status || "active"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => startEdit(employee)}>
                        Modifier
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700" onClick={() => removeEmployee(employee.id)}>
                        Supprimer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ManagerPage>
  );
}
