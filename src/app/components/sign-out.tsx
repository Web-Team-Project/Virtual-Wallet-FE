import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useSignOut = () => {
  const router = useRouter();

  const signOut = useCallback(async () => {
    try {
      await fetch("http://localhost:8000/api/v1/logout", {
        method: "GET",
        credentials: "include",
      });
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router]);

  return signOut;
};
