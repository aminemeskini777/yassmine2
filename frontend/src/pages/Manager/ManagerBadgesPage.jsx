import { useEffect, useState } from "react";
import ManagerPage from "@/components/layout/ManagerPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

export default function ManagerBadgesPage() {
  const [badges, setBadges] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [badgeId, setBadgeId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const [badgesRes, employeesRes] = await Promise.all([api.get("/badges"), api.get("/employees")]);
    setBadges(badgesRes.data || []);
    setEmployees(employeesRes.data || []);
    if (!badgeId && badgesRes.data?.length) setBadgeId(String(badgesRes.data[0].id));
    if (!employeeId && employeesRes.data?.length) setEmployeeId(String(employeesRes.data[0].id));
  }

  async function assignBadge(e) {
    e.preventDefault();
    await api.post("/badges/assign", {
      badge_id: Number(badgeId),
      user_id: Number(employeeId),
    });
    setMessage("Badge attribue avec succes.");
  }

  return (
    <ManagerPage title="Gestion des badges">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Tous les badges</CardTitle>
        </CardHeader>
        <CardContent>
          {badges.length === 0 ? (
            <p className="text-slate-500">Aucun badge disponible. Ajoute des badges en base.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {badges.map((badge) => (
                <div key={badge.id} className="rounded-xl border border-slate-200 p-3">
                  <p className="font-semibold text-slate-900">{badge.name}</p>
                  <p className="text-sm text-slate-500">{badge.description || "Sans description"}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>Attribuer un badge</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={assignBadge}>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              required
            >
              {badges.map((badge) => (
                <option key={badge.id} value={badge.id}>
                  {badge.name}
                </option>
              ))}
            </select>

            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>

            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Attribuer
            </Button>
          </form>

          {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
        </CardContent>
      </Card>
    </ManagerPage>
  );
}
