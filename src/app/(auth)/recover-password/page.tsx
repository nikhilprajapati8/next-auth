"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { recoverPasswordSchema } from "@/schemas/recoverPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RecoverPassword = () => {
  const form = useForm<z.infer<typeof recoverPasswordSchema>>({
    resolver: zodResolver(recoverPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(values: z.infer<typeof recoverPasswordSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <AuthWrapper title="Recover password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="recovery-email@gmail.com"
                    className="mt-4"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="mb-4">
                  Enter your email to recover password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full ">
            Submit
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default RecoverPassword;
