import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import config from "@/config";

// This is a server-side component to ensure the user is logged in.
// If not, it will redirect to the login page.
// It's applied to all subpages of /dashboard in /app/dashboard/*** pages
// You can also add custom static UI elements like a Navbar, Sidebar, Footer, etc..
// See https://shipfa.st/docs/tutorials/private-page
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  // You can access the user's email here
  const userEmail = session.user?.email;
  
  return (
    <div>
      <div className="bg-base-200 p-4">
        <div className="container mx-auto">
          <p className="text-sm">Logged in as: {userEmail}</p>
        </div>
      </div>
      {children}
    </div>
  );
}