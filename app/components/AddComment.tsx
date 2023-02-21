"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const AddComment = ({ id }: { id: string }) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string

  const { mutate } = useMutation(
    async (data: { title: string; postId: string }) => axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("")
        setIsDisabled(false)
        toast.success("Added your comment", {id: commentToastId})
      },
      onError: (error) => {
        setIsDisabled(false)
        if(error instanceof AxiosError){
          toast.error(error?.response?.data.message, {id: commentToastId})
        }
      } 
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading("Adding your comment...", {id: commentToastId})
    mutate({ title, postId: id });
  };

  return (
    <form className="flex justify-center items-center" onSubmit={submitComment}>
      <div className="w-full max-w-xl mx-10 lg:mx-24 lg:max-w-3xl mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="p-2 text-gray-500 font-normal">Add your comment</div>
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            name="title"
            value={title}
            className="w-full p-4 my-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
          ></input>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <div className="flex pl-0 space-x-1 sm:pl-2">
            <p
              className={`font-bold text-sm ${title.length > 300 ? "text-red-700" : "text-gray-500"}`}
            >{`${title.length}/300`}</p>
          </div>
          <button
            disabled={isDisabled}
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Add comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
