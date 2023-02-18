import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div role="status">
        <span className="font-semibold text-lg text-gray-700 ">
          Welcome back {session.user?.name}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
