import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PuffLoading from "./puff-loading";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function ProtectedRoute({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <PuffLoading />
      </div>
    );
  }

  return children;
}
