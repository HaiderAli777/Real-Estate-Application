import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MyListing() {
  const navigate = useNavigate();
  return (
    <div>
      <div className=" flex justify-center w-10/12 mx-auto my-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("lis");
            navigate("/create-Listing");
          }}
          className="bg-slate-800 p-4 rounded-lg sm:h-16 sm:w-full font-bold text-white"
        >
          Create The Listing
        </button>
      </div>
      <h1></h1>
    </div>
  );
}
