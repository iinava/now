import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../lib/constants.ts";
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { LoginRequest, UserRegistrationRequest } from "@/lib/types.ts"


type FormProps = {
  route: string;
  method: "login" | "register";
};

const AuthForm: React.FC<FormProps> = ({ route, method }) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    password_confirm: string;
    email: string;
    phone_number: string;
    full_name: string;
  }>({
    username: "",
    password: "",
    password_confirm: "",
    email: "",
    phone_number: "",
    full_name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {toast} = useToast();

  const name = method === "login" ? "Login" : "Register";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === "register" && formData.password !== formData.password_confirm) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      const payload = method === "login" 
        ? { 
            username: formData.username, 
            password: formData.password 
          } as LoginRequest
        : {
            username: formData.username,
            password: formData.password,
            password_confirm: formData.password_confirm,
            email: formData.email,
            phone_number: formData.phone_number,
            full_name: formData.full_name,
          } as UserRegistrationRequest;

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("IS_LOGGED_IN", "true");
        console.log("hi");
        
        navigate("/dashboard");
        console.log("hi3");

      } else {
        navigate("/login");
      }
    } catch (error: any) {
      console.log(error,"nen");
      const message =  "An error occurred. Please try again later.";
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
        {method === "login" ? "Welcome back!" : "Enter your details to create an account"}
      </p>
      
      <Input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Enter your username"
        required
      />

      {method === "register" && (
        <>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
          <Input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </>
      )}

      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter your password"
        required
      />

      {method === "register" && (
        <Input
          type="password"
          name="password_confirm"
          value={formData.password_confirm}
          onChange={handleInputChange}
          placeholder="Confirm your password"
          required
        />
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : name}
      </Button>

      {method === "register" ? (
        <p className="text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-primary hover:underline">Login</a>
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Don't have an account yet? <a href="/register" className="text-primary hover:underline">Register now</a>
        </p>
      )}
    </form>
  );
};

export default AuthForm;
