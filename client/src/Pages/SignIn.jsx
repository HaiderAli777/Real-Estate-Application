import React from "react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="mt-10">
      <h1 className="font-bold  text-center mt-5 mb-10 text-6xl">Login-In</h1>
      <form className="flex flex-col w-fit mx-auto">
        <input
          className="my-1 shadow-lg p-3  w-[25rem] focus:outline-none rounded-md"
          type="text"
          placeholder="Enter The email"
        ></input>
        <input
          className="my-1 shadow-lg p-3 w-[25rem] focus:outline-none rounded-md"
          type="text"
          placeholder="Enter The password"
        ></input>
        <button
          className="my-2 text-white bg-slate-800 shadow-lg p-3 w-[25rem] focus:outline-none rounded-md"
          type="button"
        >
          Login
        </button>
        <div className="">
          <span className="mr-2 font-bold">Create new account??</span>
          <Link to="/sign-up">
            <span className="text-blue-500 underline font-bold">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
