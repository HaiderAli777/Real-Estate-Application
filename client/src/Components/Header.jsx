import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const data = useSelector((state) => state.user.userdata);
  const key = Object.keys(data);

  console.log(key);
  return (
    <header className=" bg-slate-300 shadow-lg">
      <div className="flex-wrap  items-center text-center sm:flex mx-7 py-4 justify-between">
        <Link to="home">
          <h1 className="mt-1 mb-1">
            <span className="text-slate-700 text-sm sm:text-xl font-bold">
              Hadi
            </span>
            <span className="text-slate-900 text-sm sm:text-xl font-bold">
              State
            </span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-md flex items-center">
          <input
            className="bg-transparent focus:outline-none w-[18rem] font-medium"
            placeholder="Search...."
          ></input>
          <FaSearch className="font-bold "></FaSearch>
        </form>
        <ul className="flex gap-5 items-center">
          <Link to="home">
            <li className="hidden sm:inline-block text-base text-black font-bold ">
              Home
            </li>
          </Link>
          <Link to="about">
            <li className="hidden sm:inline-block text-base text-black font-bold">
              About
            </li>
          </Link>
          {key.length == 0 && (
            <Link to="sign-in">
              <li className="hidden sm:inline-block text-base text-black font-bold ">
                SignIn
              </li>
            </Link>
          )}
          {/*key.length == 0 && (
            <Link to="sign-up">
              <li className="hidden sm:inline-block text-base text-black font-bold">
                SignUp
              </li>
            </Link>
          )*/}

          {key.length > 0 && (
            <Link to="listing">
              <li className=" hidden sm:inline-block text-base text-black font-bold ">
                Listing
              </li>
            </Link>
          )}
          {key.length > 0 && (
            <Link to="profile">
              <img
                className="w-10 rounded-full h-10 object-cover hidden sm:inline-block"
                src={data.image}
              ></img>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
