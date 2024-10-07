"use client";
import AuthWrapper from "@/components/AuthWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <AuthWrapper title="Authentication">
      <p className="text-center">Proceed to login page</p>
      <Button onClick={() => router.push("/login")} className="w-full my-3">
        Login
      </Button>
    </AuthWrapper>
  );
}
