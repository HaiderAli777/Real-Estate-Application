import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
export default function Search() {
  const [loder, setloder] = useState(false);
  const [listing, setlisting] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [lenlimit, setlenlimit] = useState(0);
  let [page, setpage] = useState(1);
  console.log("run");
  const [formdata, setformdata] = useState({
    type: "rentsale",
    furnished: false,
    offer: false,
    parking: false,
    sortby: "latest",
    name: "",
  });
  console.log(formdata);

  const sumbithandler = (e) => {
    if (
      e.target.id == "rentsale" ||
      e.target.id == "rent" ||
      e.target.id == "sell"
    ) {
      console.log("ty");
      setformdata({ ...formdata, type: e.target.id });
    } else if (e.target.id == "furnished" || e.target.id == "parking") {
      console.log("ty1");
      setformdata({ ...formdata, [e.target.id]: e.target.checked });
    } else {
      console.log("ty2");
      setformdata({ ...formdata, sortby: e.target.value });
    }
  };
  const url = new URL(window.location.href);

  useEffect(() => {
    setpage(1);
    setlenlimit(0);
    console.log(window.location.href);

    console.log("he");
    const param = new URLSearchParams();
    {
      formdata.name !== "" && param.append("name", formdata.name);
    }
    {
      formdata.type !== "rentsale" && param.append("type", formdata.type);
    }
    param.append("sort", formdata.sortby);
    param.append("limit", 6);

    if (formdata.furnished) {
      param.append("furnished", formdata.furnished);
    }
    if (formdata.parking) {
      param.append("parkingssport", formdata.parking);
    }
    if (formdata.page > 0) {
      param.append("page", 1);
    }
    url.search = param.toString();
    console.log(url.search);
    window.history.pushState({}, "", url);
    const getalllisting = async () => {
      setloder(true);
      try {
        const res = await fetch(`/api/getselectedlisting?${param.toString()}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data1 = await res.json();
        console.log(data1);
        if (data1.status == "fail") {
          throw new Error("Cannot Get The Listing");
        }
        setlisting([...data1.data]);
        console.log(data1.data);
        setlenlimit(data1.length);
        setloder(false);
        setformdata({ ...formdata, name: "" });
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getalllisting();
  }, [
    formdata.type,
    formdata.offer,
    formdata.furnished,
    formdata.parking,
    formdata.sortby,
    trigger,
  ]);

  return (
    <div className="flex  mb-10 flex-col lg:flex-row">
      <div className="basis-1/4 h-screen border-r-[1px] flex flex-col gap-5 pt-16 pl-5  border-black">
        <div className="bg-white w-[12rem]">
          <input
            value={formdata.name}
            onChange={(e) => {
              setformdata({ ...formdata, name: e.target.value });
            }}
            required
            className="bg-white py-2 px-2 focus:outline-none w-[10rem] font-medium"
            placeholder="Search...."
          ></input>

          <button
            onClick={(e) => {
              e.preventDefault();
              console.log("p");

              settrigger(!trigger);
            }}
          >
            <FaSearch className="font-bold "></FaSearch>
          </button>
        </div>
        <div className="flex flex-row items-center gap-4">
          <label className="font-bold">Type:</label>
          <div>
            <input
              checked={formdata.type == "rentsale"}
              id="rentsale"
              onChange={sumbithandler}
              type="checkbox"
            ></input>
            <label className="ml-1 font-bold">Rent & Sell</label>
          </div>
          <div>
            <input
              checked={formdata.type == "rent"}
              id="rent"
              onChange={sumbithandler}
              type="checkbox"
            ></input>
            <label className="ml-1 font-bold">Rent</label>
          </div>
          <div>
            <input
              checked={formdata.type == "sell"}
              id="sell"
              onChange={sumbithandler}
              type="checkbox"
            ></input>
            <label className="ml-1 font-bold">Sell</label>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <label className="font-bold">Amenties:</label>
          <div>
            <input
              checked={formdata.parking}
              onChange={sumbithandler}
              id="parking"
              type="checkbox"
            ></input>
            <label className="ml-1 font-bold">Parking</label>
          </div>
          <div>
            <input
              checked={formdata.furnished}
              onChange={sumbithandler}
              id="furnished"
              type="checkbox"
            ></input>
            <label className="ml-1 font-bold">Furnished</label>
          </div>
        </div>
        <div className="flex items-center">
          <label className="font-bold pr-2">Sort by: </label>
          <select
            onChange={sumbithandler}
            value={formdata.sortby}
            className="py-2 px-20 outline-none rounded-md"
          >
            <option value="latest" id="latest">
              Latest
            </option>
            <option value="oldest" id="oldest">
              Oldest
            </option>
          </select>
        </div>
      </div>
      <div className="basis-2/3 h-full">
        <div className="mt-4">
          <h1 className="font-bold text-4xl ml-4 mt-6">Listing Results</h1>
        </div>
        <div>
          <div className="md:ml-14  mt-10">
            {!loder && listing.length > 0 ? (
              <div>
                <div className="flex flex-col lg:flex-row lg:flex-wrap gap-6">
                  {listing.map((data) => {
                    return (
                      <Link to={`/display-listing/${data._id}`}>
                        <div className="rounded-md lg:w-[16.5rem] h-[24rem] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-2xl transform transition duration-100 hover:scale-105">
                          <img
                            className="w-full lg:w-72 transform transition duration-500 hover:scale-110 h-52 lg:h-44 rounded-md object-cover hover:scroll-py-1"
                            src={data.images[0]}
                          ></img>
                          <h1 className="line-clamp-1 font-bold pt-5 pb-2 pl-2 text-2xl text-gray-800">
                            {data.name}
                          </h1>
                          <div className="flex items-center px-2 gap-2">
                            <img
                              width="15"
                              height="15"
                              src="https://img.icons8.com/ios-filled/50/address--v1.png"
                              alt="address--v1"
                            />
                            <p className="line-clamp-1 text-sm text-gray-600 ">
                              {data.address}
                            </p>
                          </div>
                          <p className="line-clamp-2 sm:h-16 pl-2 text-sm pt-3 text-gray-500">
                            {data.description}
                          </p>
                          <h1 className="line-clamp-1 pl-2 pt-4 text-gray-800 font-bold text-lg">
                            {data.regularprize}$/Month
                          </h1>

                          <div className="flex gap-3 pl-2 pt-1 pb-2">
                            <h1 className="font-bold">bed {data.bed}</h1>
                            <h1 className="font-bold">bath {data.bath}</h1>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <h1 className="text-center pt-20 font-bold text-4xl">
                NO LISTING FOUND
              </h1>
            )}
            {listing.length > 0 && lenlimit > page * 6 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setpage(++page);
                  const url = new URL(window.location.href);
                  const param = new URLSearchParams(url.search);

                  param.append("page", page);
                  console.log(param.toString(), "but in click");
                  const getalllisting = async () => {
                    setloder(true);
                    try {
                      const res = await fetch(
                        `/api/getselectedlisting?${param.toString()}`,
                        {
                          method: "GET",
                          headers: {
                            "content-type": "application/json",
                          },
                        }
                      );
                      const data1 = await res.json();
                      console.log(data1);
                      if (data1.status == "fail") {
                        throw new Error("Cannot Get The Listing");
                      }
                      setlisting([...listing, ...data1.data]);
                      console.log(data1.data);
                      setlenlimit(data1.length);
                      setloder(false);
                    } catch (err) {
                      setloder(false);
                      console.log(err);
                    }
                  };
                  getalllisting();
                }}
              >
                <h1 className=" mt-5 text-2xl font-bold text-blue-600">
                  show more listing..
                </h1>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
