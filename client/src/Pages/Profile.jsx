import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [openBlock, setBlock] = useState(false);
  const [password, setPassword] = useState("");
  const data = useSelector((state) => state.user.userdata);
  console.log(data);
  return (
    <div className="">
      <h1 className="text-center py-[2rem] text-5xl font-bold">Profile</h1>
      <form className="flex flex-col items-center gap-1">
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.UPZ1-G8gpc5FkNIC2RCWSgHaFj&pid=Api&P=0&h=220"
          className="rounded-full w-[6rem] mb-3"
        ></img>
        <input
          type="text"
          value={data.username}
          className="px-[1rem] w-[15rem] py-3 rounded-md outline-none font-bold"
          readOnly
        ></input>
        <input
          type="text"
          className="px-[1rem] w-[15rem] py-3 rounded-md outline-none"
          readOnly
          value={data.gmail}
        ></input>
        <button
          onClick={(e) => {
            e.preventDefault();
            setBlock(true);
          }}
          className="bg-gray-800 text-white p-3 rounded-xl mt-3"
        >
          Reset Password
        </button>
        {openBlock && (
          <input
            type="password"
            className="px-[1rem] mt-3 w-[15rem] py-3 rounded-md outline-none"
            placeholder="Enter The new Password"
            onChange={(e) => {
              setPassword(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
        )}
        {openBlock && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setBlock(false);
            }}
            className="bg-red-800 text-white py-3 px-5 rounded-xl mt-3"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
