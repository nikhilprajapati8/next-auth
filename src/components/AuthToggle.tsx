"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type authToggleProps = {
  description?: string | null;
  link?: string | null;
};

const AuthToggle = ({ description, link }: authToggleProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push(`${link}`)}
      variant={"secondary"}
      className="w-full rounded-t-none text-white bg-green-700 hover:bg-green-800  mx-auto"
    >
      {description}
    </Button>
  );
};

export default AuthToggle;
