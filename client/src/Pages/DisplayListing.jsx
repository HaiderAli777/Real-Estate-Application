import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
        console.log(data1.data.images);
        console.log(Listing.images);
        setloder(false);
      } catch (err) {
        setloder(false);
        console.log(err);
      }
    };
    getlisting();
  }, []);
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
            <button className="w-full bg-slate-700 py-5 font-bold text-white rounded-md text-2xl">
              Contact LandLord
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
