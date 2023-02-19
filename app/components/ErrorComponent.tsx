import React from "react";

const ErrorComponent = ({ message }: { message: string }) => {
    return (
        <div className="flex justify-center items-center w-full min-h-screen">
          <div role="status">
            <span className="font-semibold text-lg text-gray-700 ">
              {message}
            </span>
          </div>
        </div>
      );
};

export default ErrorComponent;
