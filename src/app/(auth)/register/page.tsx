"use client";

import { register } from "@/actions/register";
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
import { registerUserSchema } from "@/schemas/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof registerUserSchema>) {
    startTransition(async () => {
      const response = await register(values);
      if (response.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else if (response.message) {
        toast({
          title: "Success",
          description: response.message,
        });
      }
    });
  }
  return (
    <AuthWrapper
      title="Register user"
      showSocials={true}
      authToggleDescription="Already have an account"
      authToggleLink="/login"
      showAuthToggle={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    type="password"
                    {...field}
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
              <span>Create new account</span>
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default Register;
