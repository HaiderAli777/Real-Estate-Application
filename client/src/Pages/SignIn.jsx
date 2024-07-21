import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setloading, setEror, insertingData } from "../Redux/Slice/UserSlice";
export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  const [formdata, setformdata] = useState({});
  const InputHandler = (e) => {
    setformdata((prevdata) => {
      console.log(formdata);
      return {
        ...prevdata,
        [e.target.id]: e.target.value,
      };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setloading());
      console.log(formdata);
      const res = await fetch("/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const result = await res.json();
      console.log(result);
      if (result.status == "fail") {
        throw new Error(result.message);
      }
      dispatch(insertingData(result.body));
      dispatch(setloading());
      dispatch(setEror(""));
      navigate("/");
    } catch (err) {
      dispatch(setloading());
      dispatch(setEror(err.message));
    }
  };
  return (
    <div className="mt-10">
      <h1 className="font-bold  text-center mt-5 mb-10 text-6xl">Sign-In</h1>
      <form className="flex flex-col w-fit mx-auto" onSubmit={submitHandler}>
        <input
          className="my-1 shadow-lg p-3  w-[25rem] focus:outline-none rounded-md"
          type="email"
          required
          id="gmail"
          onChange={InputHandler}
          placeholder="Enter The email"
        ></input>
        <input
          className="my-1 shadow-lg p-3 w-[25rem] focus:outline-none rounded-md"
          type="password"
          required
          id="password"
          onChange={InputHandler}
          placeholder="Enter The password"
        ></input>
        <input
          className="my-2 text-white bg-slate-800 shadow-lg p-3 w-[25rem] focus:outline-none rounded-md"
          type="submit"
          value={loading ? "Loading..." : "Submit"}
          disabled={loading}
        ></input>
        <div>
          <span className="mr-2 font-bold">Do not have any account?</span>
          <Link to="/sign-up">
            <span
              onClick={() => {
                dispatch(setEror(""));
              }}
              className="text-blue-500 underline font-bold"
            >
              Sign Up
            </span>
          </Link>
        </div>
        <div className="text-red-600 font-bold">{error != "" && error}</div>
      </form>
    </div>
  );
}
