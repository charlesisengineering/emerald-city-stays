"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  // This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Your Profile</h2>
          
          {session?.user ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>User ID:</strong> {session.user.id}</p>
              
              {session.user.image && (
                <div>
                  <p><strong>Profile Image:</strong></p>
                  <img 
                    src={session.user.image} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full"
                  />
                </div>
              )}
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
}