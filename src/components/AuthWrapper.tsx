import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Socials from "./Socials";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { TriangleAlert } from "lucide-react";
import AuthToggle from "./AuthToggle";

type AuthWrapperProps = {
  title: string;
  children: React.ReactNode;
  showSocials?: boolean;
  authToggleDescription?: string;
  authToggleLink?: string;
  showAuthToggle?: boolean;
};

const AuthWrapper = ({
  title,
  children,
  showSocials = false,
  authToggleDescription,
  authToggleLink,
  showAuthToggle = false,
}: AuthWrapperProps) => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use by another provider"
      : "";

  const errorRef = useRef(urlError);

  return (
    <Card className="w-[350px] max-w-full">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">{children}</CardContent>

      {errorRef.current && (
        <div className="bg-red-200 text-red-600 rounded-lg px-2 py-2 text-xs md:text-sm mx-6 my-5 flex justify-center gap-2 items-center">
          <TriangleAlert size={15} />
          {errorRef.current}
        </div>
      )}

      {showSocials && <Socials />}
      {showAuthToggle && (
        <AuthToggle description={authToggleDescription} link={authToggleLink} />
      )}
    </Card>
  );
};

export default AuthWrapper;
