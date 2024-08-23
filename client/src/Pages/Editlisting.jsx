import React, { useState, useEffect, useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import { app } from "../GoogleAuth/firebase";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Editlisting() {
  const navigate = useNavigate();
  const [filename, setfilename] = useState(0);
  const { id } = useParams();
  const data = useSelector((state) => state.user.userdata);
  const [formerr, seterr] = useState({
    imagelimit: "",
    creationErr: false,
  });
  const [currentImages, SetCurrentImages] = useState([]);
  const [downURL, setdownURL] = useState([]);
  const [loadimage, setLoadImage] = useState(false);
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    address: "",
    type: "",
    parkingssport: false,
    furnished: false,
    offer: false,
    bath: 0,
    bed: 0,
    regularprize: 0,
    discountprize: 0,
  });
  const submitHandler = async (e) => {
    seterr((prev) => {
      return { ...prev, creationErr: true };
    });
    e.preventDefault();
    const obj = {
      ...formdata,
      images: downURL,
      userRef: data._id,
    };
    console.log(obj);
    try {
      const res = await fetch(`/api/update-listing/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      const data1 = await res.json();
      if (data1.status == "fail") {
        throw new Error("List Has not been Created");
      }
      console.log(data1);
      navigate("/listing");
      seterr((prev) => {
        return { ...prev, creationErr: false };
      });
    } catch (err) {
      seterr((prev) => {
        return { ...prev, creationErr: false };
      });
      console.log(err, "creating list not ");
    }
  };
  const uploadT = (img) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName1 = new Date().getTime() + "_" + img.name;
      const storageRef = ref(storage, fileName1);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  };

  useEffect(() => {
    const uploadImages = async () => {
      if (currentImages.length >= 1) {
        console.log("hey i am in troub");
        setLoadImage(true);
        for (const img of currentImages) {
          try {
            const url = await uploadT(img);
            setdownURL((prev) => {
              return [...prev, url];
            });
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        }
        setLoadImage(false);
        SetCurrentImages([]);
      }
    };
    uploadImages();
  }, [currentImages]);
  useEffect(() => {
    const getlisting = async () => {
      try {
        const res = await fetch(`/api/get-onelisting/${id}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data1 = await res.json();
        if (data1.status == "fail") {
          throw new Error("Cannot Get The this id Listing");
        }

        console.log(data1.data);
        const { images, userRef, _id, ...remdata } = data1.data;
        console.log("again");
        console.log(remdata);
        setformdata(remdata);
        setdownURL(images);
        setfilename(images.length);
      } catch (err) {
        console.log(err.message);
      }
    };
    getlisting();
  }, []);
  const formHandler = (e) => {
    if (e.target.id == "sell" || e.target.id == "rent") {
      console.log(e.target.id);
      setformdata({
        ...formdata,
        type: e.target.id,
      });
    } else if (
      e.target.id == "parkingssport" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      console.log(e.target.id, e.target.checked);
      setformdata({
        ...formdata,
        [e.target.id]: e.target.checked,
      });
    } else if (e.target.type == "number") {
      console.log(typeof Number(e.target.value));
      setformdata({
        ...formdata,
        [e.target.id]: Number(e.target.value),
      });
    } else {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }

    console.log(formdata);
  };
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
            onChange={formHandler}
            value={formdata.name}
            id="name"
            required
            className="py-3 rounded outline-none pl-2"
          ></input>
          <textarea
            text="text"
            id="description"
            onChange={formHandler}
            value={formdata.description}
            required
            rows={4}
            placeholder="Description"
            className="pl-2 outline-none"
          ></textarea>
          <input
            placeholder="Address"
            onChange={formHandler}
            value={formdata.address}
            id="address"
            required
            className="py-3 rounded outline-none pl-2"
          ></input>
          <div className="flex flex-row align-baseline gap-3 mt-3 flex-wrap">
            <div>
              <input
                checked={formdata.type == "sell"}
                onChange={formHandler}
                id="sell"
                type="checkbox"
                className="w-4"
              ></input>
              <label className="font-medium">Sell</label>
            </div>
            <div>
              <input
                checked={formdata.type == "rent"}
                onChange={formHandler}
                id="rent"
                type="checkbox"
                className="w-4"
              ></input>
              <label className="font-medium">Rent</label>
            </div>
            <div>
              <input
                checked={formdata.parkingssport}
                onChange={formHandler}
                id="parkingssport"
                type="checkbox"
                className="w-4"
              ></input>
              <label className="font-medium">Parking Spot</label>
            </div>
            <div>
              <input
                checked={formdata.furnished}
                onChange={formHandler}
                id="furnished"
                type="checkbox"
                className="w-4"
              ></input>
              <label className="font-medium">Furnished</label>
            </div>
            <div>
              <input
                id="offer"
                type="checkbox"
                checked={formdata.offer}
                onChange={formHandler}
                className="w-4"
              ></input>
              <label className="font-medium">Offer</label>
            </div>
          </div>
          <div className="my-3 flex flex-row flex-wrap ">
            <div>
              <input
                type="number"
                id="bed"
                max={10}
                min={1}
                value={formdata.bed}
                onChange={formHandler}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Bed</label>
            </div>
            <div>
              <input
                type="number"
                id="bath"
                value={formdata.bath}
                onChange={formHandler}
                max={10}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">Bath</label>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                id="regularprize"
                value={formdata.regularprize}
                onChange={formHandler}
                max={500000}
                min={1}
                className="w-[4rem] px-1 py-3 outline-none rounded"
              ></input>
              <label className="font-medium mx-2">
                $Regular Prize<br></br>
                {formdata.type == "rent" && <span>(/per month)</span>}
              </label>
            </div>
          </div>
          {formdata.offer && (
            <div>
              <div className="flex items-center">
                <input
                  type="number"
                  max={5}
                  min={1}
                  id="discountprize"
                  value={formdata.discountprize}
                  onChange={formHandler}
                  className="w-[4rem] px-1 py-3 outline-none rounded"
                ></input>
                <label className="font-medium  mx-2">
                  $Discounted Prize<br></br>
                  {formdata.type == "rent" && <span>(/per month)</span>}
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div>
            <p>
              <span className="font-bold">Images: </span>The first image will be
              the cover (max-6)
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-2 align-baseline">
            <input
              onChange={(e) => {
                setLoadImage(true);
                seterr({ ...formerr, imagelimit: "" });
                console.log(filename, filename.length + e.target.files.length);
                if (filename + e.target.files.length < 7) {
                  console.log(...e.target.files, "len");
                  const len = e.target.files.length;
                  console.log("len", len);
                  setfilename((prev) => {
                    return setfilename(prev + len);
                  });
                  SetCurrentImages((pre) => [...e.target.files]);
                  console.log("I am done");
                  console.log(filename);
                  setLoadImage(false);
                } else {
                  setLoadImage(false);
                  seterr({ ...formerr, imagelimit: "Only 6 Images Allowed!!" });
                  console.log("conceeded limit");
                }
              }}
              type="file"
              accept="image/*"
              multiple
              className="outline-dotted"
            ></input>
            {loadimage && (
              <div className="pl-2 text-blue-800 font-bold">Uploading..</div>
            )}
          </div>
          <div>
            {formerr.imagelimit.length > 0 && (
              <span className="text-red-600 font-bold">
                {formerr.imagelimit}
              </span>
            )}
          </div>
          <div className="py-4">
            {downURL.length > 0 && (
              <div>
                {downURL.map((img) => {
                  return (
                    <div key={img} className=" py-1 ">
                      <div className="flex justify-between py-2 px-2 rounded-sm items-center  bg-slate-200">
                        <img
                          src={img}
                          className="w-12 h-12 object-cover rounded-md"
                          alt="img"
                        ></img>
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(img);
                              const arr = downURL.filter((img1) => {
                                return img1 != img;
                              });
                              setdownURL([...arr]);
                              setfilename((prev) => --prev);
                              console.log(filename);
                            }}
                            className="text-red-600 font-bold"
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
          <div className="mt-5 items-center">
            <button
              type="submit"
              onClick={submitHandler}
              className="px-5 py-3 bg-slate-800 rounded-xl text-white disabled:bg-slate-400"
              disabled={
                formdata.name.length == 0 ||
                formdata.address.length == 0 ||
                formdata.description.length == 0 ||
                formdata.regularprize <= 0 ||
                formdata.discountprize > formdata.regularprize ||
                formdata.discountprize < 0 ||
                filename < 1 ||
                loadimage ||
                formerr.creationErr
              }
            >
              Update A Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
