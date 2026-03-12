import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagerPage from "@/components/layout/ManagerPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

export default function ManagerUserCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    status: "active",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await api.post("/employees", form);
    navigate("/manager/users");
  }

  return (
    <ManagerPage title="Creer employe">
      <Card className="max-w-2xl rounded-2xl">
        <CardHeader>
          <CardTitle>Nouveau profil employe</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Statut</Label>
              <select
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
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
