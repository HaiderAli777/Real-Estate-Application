import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
// Import Swiper styles
import "swiper/css";
import "./style.css";

export default function DisplayListing() {
  const { id } = useParams();
  const [loder, setloder] = useState(false);
  const [Listing, setlisting] = useState({});
  const [images, setimages] = useState([]);
  const [body, setbody] = useState("");
  const [pop, setpop] = useState(false);
  const [lanlord, setlandlordgmail] = useState("");
  useEffect(() => {
    const getlisting = async () => {
      setloder(true);
      try {
        const res = await fetch(`/api/get-onelisting/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data1 = await res.json();
        if (data1.status == "fail") {
          throw new Error("Cannot Get The Listing");
        }
        setlisting(data1.data);
        setimages(data1.data.images);
        console.log(data1.data.userRef);
        console.log(Listing);

        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getlisting();
  }, []);
  const getuser = async () => {
    try {
      const res = await fetch(`/api/user/getuser/${Listing.userRef}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data1 = await res.json();
      if (data1.status == "fail") {
        throw new Error("Cannot Get the User ");
      }
      console.log(data1.body.gmail);

      setlandlordgmail(data1.body.gmail);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {images.length > 0 &&
          images.map((img) => {
            console.log("hey", img);
            return (
              <SwiperSlide className="w-full h-[20rem] object-cover">
                <img src={img}></img>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {Object.keys(Listing).length > 0 ? (
        <div className="flex flex-col  gap-3 md:w-8/12 md:ml-44 mt-3 mb-28">
          <div className="mt-3 mb-7">
            <h1 className="font-bold text-2xl">{`${Listing.name}- $${
              Listing.regularprize
            } ${Listing.type == "rent" ? "/ month" : ""}`}</h1>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-filled/50/address--v1.png"
              alt="address--v1"
            />
            <p className="text-1xl">{Listing.address}</p>
          </div>
          <div className="flex gap-6 pb-1">
            <button className="bg-red-800 text-white py-3 w-52 text-center rounded-md font-bold">
              {Listing.type == "sell" ? `For Sell` : `For Rent`}
            </button>
            {Listing.offer == true && (
              <button className="bg-green-600 text-white py-3 w-52 text-center rounded-md font-bold">
                {`$${Listing.discountprize} Discount`}
              </button>
            )}
          </div>
          <div className="pb-1">
            <p className="text-lg">
              <span className="text-black font-bold">Description-</span>{" "}
              {Listing.description}
            </p>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/000000/bed.png"
                alt="bed"
              />
              <p className="font-bold text-1xl text-green-700">
                {Listing.bed} Bed
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/000000/bath.png"
                alt="bath"
              />
              <p className="font-bold text-1xl text-green-700">
                {Listing.bath} Bath
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/home.png"
                alt="home"
              />
              <p className="font-bold text-1xl text-green-700">
                {Listing.furnished ? "Furnished" : "Not Furnished"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/ios-filled/50/car.png"
                alt="car"
              />
              <p className="font-bold text-1xl text-green-700">
                {Listing.parkingssport ? "Parking Sport" : "No Parking Sport"}
              </p>
            </div>
          </div>
          <div className="pt-9">
            {pop && (
              <div>
                <p className="my-1 font-bold text-xl">{`Contact for ${Listing.type} (- ${Listing.name}) `}</p>
                <textarea
                  onChange={(e) => setbody(e.target.value)}
                  rows={4}
                  className="p-2 w-full rounded-md shadow-md outline-none my-3 bg-slate-100"
                ></textarea>
                <Link
                  to={`mailto:${lanlord}?subject=${encodeURIComponent(
                    `${Listing.type} for ${Listing.name}`
                  )}&body=${encodeURIComponent(body)}`}
                >
                  <button
                    disabled={body.length <= 0}
                    onClick={() => {
                      setTimeout(() => {
                        setpop(false);
                      }, 2000);
                    }}
                    className="w-full disabled:bg-slate-300 bg-slate-700 py-5 font-bold text-white rounded-md text-2xl"
                  >
                    Mail To LanLord
                  </button>
                </Link>
              </div>
            )}
            {!pop && (
              <button
                onClick={async (e) => {
                  await getuser();
                  setpop(true);
                }}
                className="w-full disabled:bg-slate-400 bg-slate-700 py-5 font-bold text-white rounded-md text-2xl"
              >
                Contact LandLord
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img
            className="w-20 mt-10 text-center"
            src="https://ima.alfatango.org/images/loader.gif"
          ></img>
        </div>
      )}
    </div>
  );
}
