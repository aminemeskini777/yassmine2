import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faceExpression, setFaceExpression] = useState("normal"); // normal, woooh
  const [armsUp, setArmsUp] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const normalizeRole = (value) => {
    if (!value) return "";
    const role = String(value).trim().toLowerCase();
    if (role.includes("manager")) return "manager";
    if (role.includes("employee")) return "employee";
    return role;
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      const normalizedRole = normalizeRole(user?.role);

      if (normalizedRole === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      // Déclencher l'expression "woooh"
      setFaceExpression("woooh");
      
      // Afficher l'alerte
      alert("Login failed");
      
      // Remettre l'expression normale après 1.5 secondes
      setTimeout(() => {
        setFaceExpression("normal");
      }, 1500);
    }
  };

  const eyeMove = Math.min(email.length * 2, 15);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <Card className="w-[420px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            TakeIt - Login
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* ===== AVATAR ===== */}
          <div className="flex justify-center">
            <svg width="200" height="200" viewBox="0 0 300 320">

              {/* HEAD */}
              <circle cx="150" cy="100" r="55" fill="#f1c27d" />

              {/* CHEVEUX */}
              <path 
                d="M100,85 C110,25 190,25 200,85 
                   C185,65 115,65 100,85Z" 
                fill="#0f172a"
              />
              {/* Reflet dans les cheveux */}
              <path 
                d="M130,50 L145,40 L160,50" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2"
                opacity="0.3"
              />

              {/* OREILLES */}
              <circle cx="95" cy="105" r="10" fill="#f1c27d"/>
              <circle cx="205" cy="105" r="10" fill="#f1c27d"/>

              {/* LUNETTES */}
              <rect x={110 + eyeMove - 15} y="90" width="32" height="22" rx="8"
                fill="none" stroke="#111827" strokeWidth="3"/>
              <rect x={154 + eyeMove - 15} y="90" width="32" height="22" rx="8"
                fill="none" stroke="#111827" strokeWidth="3"/>
              <line x1="146" y1="100" x2="154" y2="100" stroke="#111827" strokeWidth="3"/>

              {/* YEUX - cachés si armsUp est true */}
              {!armsUp ? (
                <>
                  <ellipse cx={128 + eyeMove} cy="100" rx="9" ry="10" fill="white"/>
                  <ellipse cx={172 + eyeMove} cy="100" rx="9" ry="10" fill="white"/>
                  {/* PUPILLES */}
                  <circle cx={128 + eyeMove} cy="100" r="4" fill="#0f172a"/>
                  <circle cx={172 + eyeMove} cy="100" r="4" fill="#0f172a"/>
                  <circle cx={126 + eyeMove} cy="98" r="1.5" fill="white"/>
                  <circle cx={170 + eyeMove} cy="98" r="1.5" fill="white"/>
                </>
              ) : (
                // Yeux fermés/cachés
                <>
                  <path d="M120,100 L136,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M164,100 L180,100" stroke="#0f172a" strokeWidth="3" strokeLinecap="round"/>
                </>
              )}

              {/* SOURCILS - avec condition pour woooh */}
              {faceExpression === "woooh" ? (
                <>
                  {/* Sourcils très hauts pour woooh */}
                  <path d="M110,65 Q128,55 145,65" stroke="#0f172a" strokeWidth="4" fill="none"/>
                  <path d="M155,65 Q172,55 190,65" stroke="#0f172a" strokeWidth="4" fill="none"/>
                </>
              ) : (
                <>
                  {/* Sourcils normaux */}
                  <path d="M115,80 Q128,73 140,80" stroke="#0f172a" strokeWidth="3" fill="none"/>
                  <path d="M160,80 Q172,73 185,80" stroke="#0f172a" strokeWidth="3" fill="none"/>
                </>
              )}

              {/* BOUCHE - avec condition pour woooh */}
              {faceExpression === "woooh" ? (
                // Bouche en "O" de surprise pour woooh
                <circle cx="150" cy="135" r="12" fill="#7c2d12" />
              ) : (
                // Sourire normal
                <path 
                  d="M130,130 Q150,145 170,130" 
                  stroke="#7c2d12" 
                  strokeWidth="3" 
                  fill="none"
                />
              )}

              {/* POMMETTES */}
              <circle cx="120" cy="115" r="5" fill="#e8b78b" opacity="0.3"/>
              <circle cx="180" cy="115" r="5" fill="#e8b78b" opacity="0.3"/>

              {/* COU */}
              <rect x="135" y="145" width="30" height="25" fill="#f1c27d"/>

              {/* VESTE */}
              <path 
                d="M90,170 L210,170 L230,310 L70,310 Z" 
                fill="#1e293b"
              />
              {/* Revers de la veste */}
              <path 
                d="M135,170 L150,190 L165,170" 
                fill="none" 
                stroke="#334155" 
                strokeWidth="2"
              />

              {/* CHEMISE */}
              <polygon points="150,170 125,210 175,210" fill="white"/>

              {/* CRAVATE */}
              <polygon points="150,175 140,210 160,210" fill="#2563eb"/>
              <polygon points="140,210 160,210 150,250" fill="#1d4ed8"/>
              <circle cx="150" cy="190" r="3" fill="#1e3a8a"/>

              {/* BRAS */}
              {!armsUp ? (
                <>
                  <path 
                    d="M110,190 C70,220 60,260 50,300" 
                    stroke="#1e293b" 
                    strokeWidth="14" 
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path 
                    d="M190,190 C230,220 240,260 250,300" 
                    stroke="#1e293b" 
                    strokeWidth="14" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  {/* Bras qui cachent les yeux */}
                  <path 
                    d="M100,190 C80,150 100,100 135,95" 
                    stroke="#1e293b" 
                    strokeWidth="18" 
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path 
                    d="M200,190 C220,150 200,100 165,95" 
                    stroke="#1e293b" 
                    strokeWidth="18" 
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* MAINS */}
              <circle cx="45" cy="310" r="12" fill="#f1c27d"/>
              <circle cx="255" cy="310" r="12" fill="#f1c27d"/>

            </svg>
          </div>

          {/* ===== FORM ===== */}
          <form
            className="space-y-4"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="user@soprahr.com"
                autoComplete="off"
                name="login_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => {
                  setArmsUp(false);
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="********"
                autoComplete="new-password"
                name="login_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => {
                  setArmsUp(true); // Lève les bras pour cacher les yeux
                }}
                onBlur={() => setArmsUp(false)} // Baisse les bras quand on quitte le champ
              />
            </div>

            <Button 
              type="submit" 
              className="w-full mt-4"
            >
              Sign In
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
}

export default Login;