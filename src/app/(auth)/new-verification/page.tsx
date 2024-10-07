"use client";
import { newVerification } from "@/actions/new-verification";
import AuthWrapper from "@/components/AuthWrapper";
import { useToast } from "@/hooks/use-toast";
import { LoaderPinwheel } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (!token) {
      toast({
        title: "Error",
        description: "Missing token!",
        variant: "destructive",
      });
      return;
    }
    newVerification(token as string).then((response) => {
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
        router.push("/login");
      }
    });
  }, [token, toast, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <AuthWrapper title="Verifying email" showSocials={false}>
      <div className="flex gap-3 justify-center pt-2 pb-4">
        <LoaderPinwheel className="animate-spin" />
        <LoaderPinwheel className="animate-spin" />
        <LoaderPinwheel className="animate-spin" />
      </div>
      <p className="text-center mb-4 animate-pulse">Please wait ...</p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
