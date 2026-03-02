import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const normalizeRole = (value) => {
    if (!value) return "";
    const role = String(value).trim().toLowerCase();
    if (role.includes("manager")) return "manager";
    if (role.includes("employee")) return "employee";
    return role;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      const normalizedRole = normalizeRole(user?.role);

      if (normalizedRole === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-white gap-8">
      
      <div className="hidden md:flex w-1/2 items-center justify-end pr-6">
        <div
          className={`w-[500px] h-[440px] max-w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 ease-out ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <img
            src="/images/2.png"
            alt="Login Visual"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      
      <div className="flex w-full md:w-1/2 items-center justify-start bg-white px-6">
        <div
          className={`w-full max-w-md space-y-8 transition-all duration-300 ease-out delay-75 ${
            isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
         
          <div className="flex justify-start">
            <img
              src="/images/1.jpg"
              alt="Company Logo"
              className="h-32 w-[260px] object-contain"
            />
          </div>

         
          <div>
            <h5 className="text-xl font-bold text-gray-800">S'authentifier</h5>
          </div>

         
          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            <div className="space-y-2">
              <Label>Adresse email</Label>
              <Input
                type="email"
                placeholder="user@soprahr.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Mot de passe</Label>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-lg transition-all duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
            >
              Se Connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
