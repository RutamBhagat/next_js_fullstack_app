"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const FormInput = () => {
   const [title, setTitle] = useState("");
   const router = useRouter()

   const submitPost = async (e: React.FormEvent) => {
      e.preventDefault();
      const data = await fetch("/api/createPost", {
         method: "POST",
         body: JSON.stringify({ title: title }),
      });
      const res = await data.json();
      router.refresh()
      if (!res.ok) {
         console.log(res.message);
      }
   };

   return (
      <form onSubmit={submitPost}>
         <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Insert Post
         </label>
         <div className="relative">
            <input
               onChange={(e) => setTitle(e.target.value)}
               value={title}
               type="text"
               id="default-search"
               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Create Post"
               required
            />
            <button
               type="submit"
               className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               Create
            </button>
         </div>
      </form>
   );
};

export default FormInput;
