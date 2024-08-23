import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function MyListing() {
  const navigate = useNavigate();
  const [loder, setloder] = useState(false);
  const [listing, setlisting] = useState([]);
  const [del, setdel] = useState(1);
  const [err, seterr] = useState("");
  const data2 = useSelector((state) => state.user.userdata);

  useEffect(() => {
    const getlisting = async () => {
      setloder(true);
      try {
        const res = await fetch(`/api/get-listing/${data2._id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data1 = await res.json();
        if (data1.status == "fail") {
          throw new Error("Cannot Get The Listing");
        }
        setlisting([...data1.data]);
        console.log(data1.data);
        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getlisting();
  }, [del]);
  return (
    <div>
      <div className=" flex flex-col justify-center w-10/12 mx-auto mt-10">
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
        {err.length > 0 && err.includes("Successfully") ? (
          <span className="text-blue-600 font-bold py-1 text-center">
            {err}
          </span>
        ) : (
          <span className="text-red-600 font-bold mt-3 text-center">{err}</span>
        )}
        <div className=" mt-4 text-center">
          {listing.length == 0 ? (
            loder ? (
              <div className="flex justify-center">
                <img
                  className="w-20 mt-10 text-center"
                  src="https://ima.alfatango.org/images/loader.gif"
                ></img>
              </div>
            ) : (
              <h1 className="pt-10 font-bold text-4xl">No Listing Found</h1>
            )
          ) : (
            <div>
              {listing.map((data) => {
                return (
                  <div key={data._id}>
                    <div className="flex flex-col sm:flex-row justify-between my-5 bg-slate-300 items-center gap-y-5 py-3 px-5 rounded-md">
                      <div className="flex   gap-4 ">
                        <img
                          className="w-24 h-24 object-cover rounded-md"
                          src={data.images[0]}
                        ></img>
                        <button
                          onClick={() => {
                            navigate(`/display-listing/${data._id}`);
                          }}
                          className="text-black font-bold text-2xl"
                        >
                          {data.name}
                        </button>
                      </div>
                      <div className="flex flex-col">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/edit-listing/${data._id}`);
                          }}
                          className="text-green-600 font-bold text-xl"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();

                            try {
                              const res = await fetch(
                                `/api/delete-listing/${data._id}`,
                                {
                                  method: "DELETE",
                                  headers: {
                                    "content-type": "application/json",
                                  },
                                }
                              );
                              const data3 = await res.json();
                              console.log(data3);
                              if (data3.status == "fail") {
                                throw new Error("Cannot Delete The Listing");
                              }
                              seterr(
                                " Successfully! The list has been deleted"
                              );
                              setTimeout(() => {
                                seterr("");
                              }, 2000);
                              setdel((prev) => prev + 1);
                            } catch (err) {
                              seterr(err.message);
                              console.log(err);
                            }
                          }}
                          className="text-red-600 font-bold text-xl"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <h1></h1>
    </div>
  );
}
