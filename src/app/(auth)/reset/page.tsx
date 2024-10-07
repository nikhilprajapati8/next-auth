"use client";
import { resetPassword } from "@/actions/reset";
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
import { passwordResetEmailSchema } from "@/schemas/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPassword = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof passwordResetEmailSchema>>({
    resolver: zodResolver(passwordResetEmailSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof passwordResetEmailSchema>) {
    startTransition(async () => {
      const response = await resetPassword(values);
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
      }
    });
  }
  return (
    <AuthWrapper
      title="Forgot password?"
      showAuthToggle={true}
      authToggleDescription="Back to login"
      authToggleLink="/login"
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
                    placeholder="resetpassword@gmail.com"
                    {...field}
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            style={{ marginTop: "1rem", marginBottom: "2rem" }}
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
              <span>Send email</span>
            )}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default ResetPassword;
