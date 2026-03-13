import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormField, FormItem, FormMessage } from "@/dashboard/components/ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/api/auth";
import { useAuthStore } from "@/stores/user";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const inputStyle = "h-11! focus-visible:black";
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginApi(data),
    onSuccess: (res) => {
      if (res.ok && res.data?.data) {
        const userData = res.data.data.user;
        
        // Ensure only Admins can log in
        if (userData.role !== "Admin") {
          toast.error("Access Denied", {
            description: "You do not have administrative privileges to access this dashboard."
          });
          return;
        }

        setAuth({
          token: res.data.data.accessToken,
          user: userData,
        });

        toast.success(res.data.message || "Welcome back, Admin!");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error("Login Failed", {
          description: res.error || res.data?.message || "Invalid credentials. Please try again."
        });
      }
    },
    onError: () => {
      toast.error("Login Error", {
        description: "An unexpected error occurred. Please check your connection."
      });
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <Input
                placeholder="admin@example.com"
                className={inputStyle}
                disabled={loginMutation.isPending}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="******"
                className={inputStyle}
                disabled={loginMutation.isPending}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-11"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </FormProvider>
  );
}
