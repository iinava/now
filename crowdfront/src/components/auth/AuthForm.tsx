import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../lib/constants.ts";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"


type FormProps = {
  route: string;
  method: "login" | "register";
};

const AuthForm: React.FC<FormProps> = ({ route, method }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {toast} = useToast();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: { username: string; password: string; email?: string } = {
        username,
        password,
      };
      if (method === "register" && email) payload.email = email;

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("IS_LOGGED_IN", "true");
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      const message = error.response?.data?.detail || "An error occurred. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md p-6 space-y-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-sm text-muted-foreground">
        Enter your personal details to create an account
      </p>

      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
      />

      {method === "register" && (
        <Input
          type="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      )}

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : name}
      </Button>

      {method === "register" ? (
        <p className="text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Don’t have an account yet? <a href="/register" className="text-primary hover:underline">Register now</a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
