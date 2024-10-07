"use client";
import { updatePassword } from "@/actions/update-password";
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
import { passwordResetSchema } from "@/schemas/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewPassword = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
    },
  });
  async function onSubmit(values: z.infer<typeof passwordResetSchema>) {
    if (!token) {
      toast({
        title: "Error",
        description: "Missing token",
      });
      return;
    }
    startTransition(async () => {
      const response = await updatePassword(values, token);
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else if (response?.message) {
        toast({
          title: "Success",
          description: response?.message,
        });
        router.push("/login");
      }
    });
  }
  return (
    <AuthWrapper title="Change password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    {...field}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            style={{ marginBottom: "2rem" }}
            size="sm"
            disabled={isPending}
          >
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
              <span>Reset</span>
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default NewPassword;
