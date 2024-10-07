"use client";

import { login } from "@/actions/login";
import AuthWrapper from "@/components/AuthWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loginUserSchema } from "@/schemas/loginUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof loginUserSchema>) {
    startTransition(async () => {
      const response = await login(values);
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else if (response?.message) {
        toast({
          title: "Success",
          description: response.message,
        });
      }
    });
  }
  return (
    <AuthWrapper
      title="Login"
      showSocials={true}
      authToggleDescription="Create new account"
      authToggleLink="/register"
      showAuthToggle={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" size="sm" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2
                  className="animate animate-spin mr-2"
                  width={20}
                  height={20}
                />
                <span>Please wait</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
      <Link href={"/reset"} className="hover:underline text-xs opacity-70">
        Forgot password?
      </Link>
    </AuthWrapper>
  );
};

export default Login;
