
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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

  const onSubmit = (data: LoginFormValues) => console.log(data);

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
                placeholder="your@email.com"
                className={inputStyle}
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
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <p className="text-sm font-semibold text-end ">
            Don't have an account{" "}
            <Link to={"/register"} className="font-bold underline text-red-700">
              Signup
            </Link>
          </p>
        </div>
        <Button type="submit" className="w-full h-11 ">
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
