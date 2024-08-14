import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { insertingData } from "../Redux/Slice/UserSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../GoogleAuth/firebase";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBlock, setBlock] = useState(false);
  const [password, setPassword] = useState("");
  const imageref = useRef(null);
  const [filename, setfilename] = useState("");
  const [error, setError] = useState("");
  const data = useSelector((state) => state.user.userdata);
  console.log(data);
  const signout = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await fetch("api/user/signout", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status == "fail") {
        throw new Error("Failed SignOut! Try Again");
      }
      console.log(data);
      dispatch(insertingData({}));
      navigate("/sign-in");
    } catch (err) {
      console.log("signout", err);
      setError(err.message);
    }
  };
  const deleteAcc = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const response = await fetch(`api/user/delete/${data._id}`, {
        method: "Delete",
        headers: {
          "content-type": "application/json",
        },
      });
      const data1 = await response.json();
      if (data1.status == "fail") {
        throw new Error("Account Not Deleted! Try Again");
      }
      console.log(data1);
      dispatch(insertingData({}));
      navigate("/sign-in");
    } catch (err) {
      console.log("signout", err);
      setError(err.message);
    }
  };
  console.log(data);
  useEffect(() => {
    if (filename) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + filename.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, filename);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            //setfilename(downloadURL);
            console.log(fileName);
            dispatch(insertingData({ ...data, image: downloadURL }));
          });
        }
      );
    }
  }, [filename]);
  return (
    <div className="">
      <h1 className="text-center py-[2rem] text-5xl font-bold">Profile</h1>
      <form className="flex flex-col items-center gap-1">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={imageref}
          onChange={(e) => {
            setfilename(e.target.files[0]);
            console.log(filename);
          }}
        ></input>
        <img
          src={
            data.image ||
            "https://tse2.mm.bing.net/th?id=OIP.UPZ1-G8gpc5FkNIC2RCWSgHaFj&pid=Api&P=0&h=220"
          }
          onClick={() => imageref.current.click()}
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
        <div className="flex flex-row gap-20">
          <button
            onClick={signout}
            className="bg-gray-800 text-white p-3 rounded-xl mt-3"
          >
            SignOut
          </button>
          <button
            onClick={deleteAcc}
            className="bg-gray-800 text-white p-3 rounded-xl mt-3"
          >
            Delete
          </button>
        </div>
        {error.length > 0 && error}
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
