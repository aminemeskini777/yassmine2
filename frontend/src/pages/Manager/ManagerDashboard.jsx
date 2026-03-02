import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Award,
  ClipboardList,
  Medal,
  PlusCircle,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";

export default function ManagerDashboard() {
  const stats = [
    {
      title: "Total Employes",
      value: "48",
      subtitle: "Actifs ce mois",
      icon: Users,
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Taches Actives",
      value: "17",
      subtitle: "5 a haute priorite",
      icon: ClipboardList,
      color: "text-red-600 bg-red-100",
    },
    {
      title: "Badges Attribues",
      value: "126",
      subtitle: "+12 cette semaine",
      icon: Award,
      color: "text-orange-700 bg-orange-100",
    },
    {
      title: "Performance Equipe",
      value: "92%",
      subtitle: "+4% vs mois precedent",
      icon: TrendingUp,
      color: "text-red-700 bg-red-100",
    },
  ];

  const topEmployees = [
    { name: "Salma Benali", tasks: 21 },
    { name: "Yassine El Idrissi", tasks: 18 },
    { name: "Amine Tahiri", tasks: 15 },
  ];

  return (
    <div className="flex">
      <Sidebar role="manager" />

      <div className="flex-1 min-h-screen bg-slate-50">
        <Navbar title="Manager Dashboard" />

        <div className="space-y-7 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="rounded-2xl border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <CardContent className="flex items-start justify-between p-5">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.subtitle}</p>
                    </div>
                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="rounded-2xl border-slate-200/80 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>Top Contributeurs</CardTitle>
              <CardDescription>Employes avec le plus de taches cloturees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {topEmployees.map((emp, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="font-medium text-slate-800">{emp.name}</span>
                  <span className="text-sm text-slate-500">{emp.tasks} taches cloturees</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Button className="h-auto items-start justify-start rounded-2xl bg-orange-600 px-5 py-4 text-left shadow-sm transition-all duration-200 hover:bg-orange-700 hover:shadow-md">
              <PlusCircle className="mt-0.5 size-5" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">Creer une tache</span>
                <span className="text-xs text-orange-100">Planifier et assigner rapidement</span>
              </span>
            </Button>

            <Button className="h-auto items-start justify-start rounded-2xl bg-red-600 px-5 py-4 text-left shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md">
              <Medal className="mt-0.5 size-5" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">Gerer les badges</span>
                <span className="text-xs text-red-100">Recompenser les meilleures contributions</span>
              </span>
            </Button>

            <Button className="h-auto items-start justify-start rounded-2xl bg-orange-700 px-5 py-4 text-left shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md">
              <UserCog className="mt-0.5 size-5" />
              <span className="flex flex-col items-start">
                <span className="font-semibold">Gerer les employes</span>
                <span className="text-xs text-orange-100">Profils, roles et organisation</span>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
