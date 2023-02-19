"use client";
import React from "react";
import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostType } from "@/app/types/Posts";
import LoadingComponent from "@/app/components/LoadingComponent";
import ErrorComponent from "@/app/components/ErrorComponent";
import AddComment from "@/app/components/AddComment";

type URL = {
  params: {
    id: string;
  };
};

const fetchDetails = async (id: string) => {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
};

const PostDetail = (url: URL) => {
  const { data, isLoading, isError, error } = useQuery<PostType>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.id),
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    const { message } = error as Error;
    return <ErrorComponent message={message} />;
  }

  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <Post post={data} />
      </div>
      <AddComment id={data?.id} />
    </div>
  );
};

export default PostDetail;
