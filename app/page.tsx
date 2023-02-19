"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import shortid from "shortid";
import CreatePost from "./components/CreatePost";
import ErrorComponent from "./components/ErrorComponent";
import LoadingComponent from "./components/LoadingComponent";
import Posts from "./components/Post";
import Toggle from "./components/Toggle";
import { type PostType } from "./types/Posts";

// Fetch all posts from the server
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isError, isLoading } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: allPosts,
  });

  if (isLoading) {
    <LoadingComponent />;
  }

  if (isError) {
    const { message } = error as Error;
    <ErrorComponent message={message} />;
  }

  return (
    <main className="bg-white min-h-screen">
      <CreatePost />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {data?.map((post) => (
              <Posts key={shortid.generate()} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
