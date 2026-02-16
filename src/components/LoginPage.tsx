import { useState } from "react";
import { Bot, Lock, User } from "lucide-react";
import { MOCK_USERS } from "@/data/mockData";

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Inserire username e password");
      return;
    }
    if (MOCK_USERS[username] === password) {
      setLoading(true);
      setTimeout(() => onLogin(username), 600);
    } else {
      setError("Credenziali non valide");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary glow-md">
            <Bot className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Archabot</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Assistente AI Intelligente</p>
        </div>

        {/* Card */}
        <form onSubmit={handleLogin} className="rounded-xl border border-border bg-card p-6 shadow-xl">
          <div className="mb-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Lock className="h-4 w-4" />
            Accedi al Sistema
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-secondary pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-border bg-secondary pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-destructive animate-fade-in">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-11 w-full rounded-lg gradient-primary font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 glow-sm"
          >
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>

          <div className="mt-5 rounded-lg bg-secondary/50 p-3 text-xs text-muted-foreground">
            <p className="font-medium">Account di test:</p>
            <p className="mt-1 font-mono">admin / admin</p>
            <p className="font-mono">user / password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
