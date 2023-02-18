import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("api/auth/signin");
  }
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <span className="font-semibold text-lg text-gray-700 ">
        Welcome back {session.user?.name}
      </span>
      
      <MyPosts />
    </div>
  );
};

export default Dashboard;
