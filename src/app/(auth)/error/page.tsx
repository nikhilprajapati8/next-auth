"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Error = () => {
  const router = useRouter();
  return (
    <AuthWrapper title="Error">
      <div className="w-full flex items-center flex-col space-y-3">
        <p>Something went wrong :(</p>
        <Button onClick={() => router.push("/login")} className="h-8">
          Back to login page
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default Error;
