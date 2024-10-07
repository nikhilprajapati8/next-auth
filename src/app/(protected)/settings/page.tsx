import { auth, signOut } from "@/auth";
import React from "react";

const Settings = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">logout</button>
      </form>
    </div>
  );
};

export default Settings;
