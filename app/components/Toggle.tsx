"use client";
import React from "react";

type ToggleProps = {
  isToggleOpen: boolean;
  toggleHandler: () => void;
  deletePost: () => void;
};

const Toggle = ({ isToggleOpen, toggleHandler, deletePost }: ToggleProps) => {
  return (
    <>
      {/* <!-- Main modal --> */}
      <div
        id="defaultModal"
        className={`fixed top-0 left-0 right-0 bottom-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full ${
          isToggleOpen ? "" : "hidden"
        }`}
      >
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              // The click was made on the div itself, not on a child element
              toggleHandler();
            }
          }}
          className="w-full min-h-screen flex justify-center items-center bg-black bg-opacity-25"
        >
          <div className="relative w-full h-full max-w-2xl md:h-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Are you sure you want to delete this post?
                </h3>
                <button
                  onClick={toggleHandler}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Pressing the delete button will permanently delete this post
                </p>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={deletePost}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Delete Post
                </button>
                <button
                  onClick={toggleHandler}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toggle;