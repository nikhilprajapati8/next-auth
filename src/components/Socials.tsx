"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { Github, Google } from "./icons/Icons";
import { providerLogin } from "@/actions/provider";

type SocialsProp = {
  disable?: boolean;
};

const Socials = ({ disable }: SocialsProp) => {
  const [isPending, startTransition] = useTransition();
  const SocialsSignup = (provider: "google" | "github") => {
    startTransition(() => {
      providerLogin(provider).then((data) => console.log(data));
    });
  };
  return (
    <div className="flex w-full justify-center my-6 px-6 gap-8">
      <Button
        onClick={() => SocialsSignup("google")}
        disabled={disable || isPending}
        className="flex-grow bg-white hover:bg-[#c7c7c7] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <Google />
      </Button>
      <Button
        onClick={() => SocialsSignup("github")}
        disabled={disable || isPending}
        className="flex-grow bg-white hover:bg-[#c7c7c7] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
      >
        <Github />
      </Button>
    </div>
  );
};

export default Socials;
