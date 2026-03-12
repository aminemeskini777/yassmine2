import ManagerPage from "@/components/layout/ManagerPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/api/axios";

export default function ManagerReportsPage() {
  async function downloadTeamReport() {
    const response = await api.get("/reports/team", { responseType: "blob" });
    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `team-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <ManagerPage title="Rapports">
      <Card className="max-w-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Rapport equipe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            Export CSV (ouvrable sous Excel): performance equipe, taches cloturees et badges distribues.
          </p>
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={downloadTeamReport}>
            Telecharger le rapport
          </Button>
        </CardContent>
      </Card>
    </ManagerPage>
  );
}
