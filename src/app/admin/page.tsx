
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real application, this would be a secure API call.
    // For this prototype, we use a simple client-side check.
    if (password === "admin") {
      toast({
        title: "Login erfolgreich!",
        description: "Sie werden zum Dashboard weitergeleitet.",
      });
      // Store a session token to "secure" the dashboard page
      sessionStorage.setItem("admin-auth", "true");
      router.push("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login fehlgeschlagen",
        description: "Das eingegebene Passwort ist falsch.",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Bitte geben Sie das Passwort ein, um auf das Dashboard zuzugreifen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Anmelden..." : "Anmelden"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
