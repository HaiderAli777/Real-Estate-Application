import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
// Import Swiper styles
import "swiper/css";
import "./style.css";
export default function Home() {
  const data = useSelector((state) => state.user.userdata);
  const [loder, setloder] = useState(false);
  const [offerlisting, setofferlisting] = useState([]);
  const [rentlisting, setrentlisting] = useState([]);
  const [selllisting, setselllisting] = useState([]);
  useEffect(() => {
    const getalllisting = async () => {
      setloder(true);
      try {
        const res = await fetch(
          `/api/getselectedlisting?offer=true&page=1&limit=4`,
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
        setofferlisting([...data1.data]);
        fetchRentListing();
        console.log(data1.data);

        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getalllisting();
  }, []);

  const fetchRentListing = async () => {
    const getalllisting = async () => {
      setloder(true);
      try {
        const res = await fetch(
          `/api/getselectedlisting?type=rent&page=1&limit=4`,
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
        setrentlisting([...data1.data]);
        console.log(data1.data);
        fetchSellListing();

        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getalllisting();
  };
  const fetchSellListing = async () => {
    const getalllisting = async () => {
      setloder(true);
      try {
        const res = await fetch(
          `/api/getselectedlisting?type=sell&page=1&limit=4`,
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
        setselllisting([...data1.data]);
        console.log(data1.data);

        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getalllisting();
  };
  return (
    <div className="mb-52">
      <div className="sm:w-[40rem] sm:mt-20 sm:ml-24">
        <h1 className="text-6xl font-bold mb-5">
          Find your next <span className="text-gray-500">perfect</span> place
          with ease
        </h1>
        <p className="text-gray-500">
          Haider Ali specializes in helping buyers and sellers navigate the real
          estate market according to their specific desires and requirements.
        </p>
        {Object.keys(data).length == 0 && (
          <Link to="/sign-up">
            <p className="text-blue-800 font-bold">
              Sign-in to start your journey
            </p>
          </Link>
        )}
      </div>
      {!loder ? (
        <div className="mt-20">
          <div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {offerlisting.length > 0 &&
                offerlisting.map((data) => {
                  console.log("hey", data.images[0]);
                  return (
                    <SwiperSlide className="w-full h-[20rem] object-cover">
                      <img src={data.images[0]}></img>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
          <div>
            <div className="md:mx-20  mt-20">
              <h1 className="py-3 text-2xl font-bold text-gray-700">
                Recent Offers
              </h1>
              {!loder && offerlisting.length > 0 ? (
                <div>
                  <Link to="/search/?">
                    <h1 className="pb-2 text-blue-600 font-bold">
                      click to show more...
                    </h1>
                  </Link>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {offerlisting.map((data) => {
                      if (data.offer == true) {
                        return (
                          <Link to={`/display-listing/${data._id}`}>
                            <div className="rounded-md lg:w-72 h-[24rem] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-2xl transform transition duration-100 hover:scale-105">
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
                              <p className="line-clamp-2 h-16 pl-2 text-sm pt-3 text-gray-500">
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
                      }
                    })}
                  </div>
                </div>
              ) : (
                <h1 className="text-center font-bold text-3xl ">
                  No Offer Available
                </h1>
              )}
            </div>
          </div>
          <div>
            <div className="md:mx-20  mt-10">
              <h1 className="py-3 text-2xl font-bold text-gray-700">
                Recent Places for Rent
              </h1>
              {!loder && offerlisting.length > 0 ? (
                <div>
                  <Link to="/search">
                    <h1 className="pb-2 text-blue-600 font-bold">
                      click to show more...
                    </h1>
                  </Link>

                  <div className="flex flex-col lg:flex-row gap-6 ">
                    {rentlisting.map((data) => {
                      return (
                        <Link to={`/display-listing/${data._id}`}>
                          <div className="rounded-md lg:w-72 h-[24rem] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-2xl transform transition duration-100 hover:scale-105">
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
                            <p className="line-clamp-2 pl-2 h-16 text-sm pt-3 text-gray-500">
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
                <h1 className="text-center font-bold text-3xl ">
                  No Department For Rent Available
                </h1>
              )}
            </div>
          </div>
          <div>
            <div className="md:mx-20  mt-10">
              <h1 className="py-3 text-2xl font-bold text-gray-700">
                Recent Places for Sell
              </h1>
              {!loder && offerlisting.length > 0 ? (
                <div>
                  <Link to="/search">
                    <h1 className="pb-2 text-blue-600 font-bold">
                      click to show more...
                    </h1>
                  </Link>

                  <div className=" flex flex-col lg:flex-row  gap-6">
                    {selllisting.map((data) => {
                      return (
                        <Link to={`/display-listing/${data._id}`}>
                          <div className="rounded-md h-[24rem] lg:w-72 overflow-hidden flex flex-col bg-white shadow-md hover:shadow-2xl transform transition duration-100 hover:scale-105">
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
                            <p className="line-clamp-2 h-16 pl-2 text-sm pt-3 text-gray-500">
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
                <h1 className="text-center font-bold text-3xl ">
                  No Department For Sell Available
                </h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="pt-20 text-4xl font-bold text-center">
          NO LSITING FOUND..
        </h1>
      )}
    </div>
  );
}
