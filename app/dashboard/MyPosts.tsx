"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type AuthPostsType } from "../types/AuthPosts";
import Loading from "../components/Loading";
import Error from "../components/Error";
import EditPost from "./EditPost";
import shortid from "shortid";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

const MyPosts = () => {
  const { data, isLoading, isError, error } = useQuery<AuthPostsType>({
    queryKey: ["auth-posts"],
    queryFn: fetchAuthPosts,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    const { message } = error as Error;
    return <Error message={message} />;
  }
  
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {data?.posts.map((post) => (
            <EditPost key={shortid.generate()} post={post} userName={data.name} userImage={data.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyPosts;
