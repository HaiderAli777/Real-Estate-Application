import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const data = useSelector((state) => state.user.userdata);
  const [dis, setdis] = useState(true);
  const [name, setname] = useState("");
  const key = Object.keys(data);
  const navigate = useNavigate();

  console.log(key);
  return (
    <header className=" bg-slate-300 shadow-lg">
      <div className="flex-wrap  items-center text-center sm:flex mx-7 py-4 justify-between">
        <Link to="home">
          <h1 className="mt-1 hidden sm:block mb-1">
            <span className="text-slate-700 text-sm sm:text-xl font-bold">
              Hadi
            </span>
            <span className="text-slate-900 text-sm sm:text-xl font-bold">
              State
            </span>
          </h1>
        </Link>

        <ul className="flex gap-5 items-center ">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/search");
            }}
            type="submit"
          >
            <FaSearch className="font-bold "></FaSearch>
          </button>

          <Link to="home">
            <li className=" sm:inline-block text-base text-black font-bold ">
              Home
            </li>
          </Link>
          <Link to="about">
            <li className=" sm:inline-block text-base text-black font-bold">
              About
            </li>
          </Link>
          {key.length == 0 && (
            <Link to="sign-in">
              <li className=" sm:inline-block text-base text-black font-bold ">
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
              <li className="  sm:inline-block text-base text-black font-bold ">
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
