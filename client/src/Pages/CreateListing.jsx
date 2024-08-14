import React from "react";

export default function CreateListing() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-center my-[2rem]">
        Create A Listing
      </h1>
      <div className="flex flex-row justify-center flex-wrap gap-6 ">
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Name"
            className="py-3 rounded outline-none pl-2"
          ></input>
          <textarea
            text="text"
            rows={4}
            placeholder="Description"
            className="pl-2 outline-none"
          ></textarea>
          <input
            placeholder="Address"
            className="py-3 rounded outline-none pl-2"
          ></input>
          <div className="flex flex-row align-baseline gap-3 mt-3 flex-wrap">
            <div>
              <input name="Sell" type="checkbox" className="w-4"></input>
              <label className="font-medium">Sell</label>
            </div>
            <div>
              <input name="Rent" type="checkbox" className="w-4"></input>
              <label className="font-medium">Rent</label>
            </div>
            <div>
              <input
                name="Parking-Spot"
                type="checkbox"
                className="w-4"
              ></input>
              <label className="font-medium">Parking Spot</label>
            </div>
            <div>
              <input name="Furnished" type="checkbox" className="w-4"></input>
              <label className="font-medium">Furnished</label>
            </div>
            <div>
              <input name="Offer" type="checkbox" className="w-4"></input>
              <label className="font-medium">Offer</label>
            </div>
          </div>
          <div className="mt-3 flex flex-row flex-wrap ">
            <div>
              <input
                type="number"
                max={5}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Bed</label>
            </div>
            <div>
              <input
                type="number"
                max={5}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Bath</label>
            </div>
            <div>
              <input
                type="number"
                max={5}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Regular Prize</label>
            </div>
          </div>
          <div>
            <div>
              <input
                type="number"
                max={5}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Discounted Prize</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <p>
              <span className="font-bold">Images: </span>The first image will be
              the cover (max-6)
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-2 align-baseline">
            <input type="file" className="outline-dotted"></input>
            <button className="bg-slate-900 rounded-md text-white p-3">
              UPLOAD
            </button>
          </div>
          <div className="mt-5 items-center">
            <button className="px-5 py-3 bg-slate-800 rounded-xl text-white">
              Create A Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
