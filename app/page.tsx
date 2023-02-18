"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import shortid from "shortid";
import CreatePost from "./components/CreatePost";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Posts from "./components/Posts";
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
    <Loading />;
  }

  if (isError) {
    const { message } = error as Error;
    <Error message={message} />;
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
