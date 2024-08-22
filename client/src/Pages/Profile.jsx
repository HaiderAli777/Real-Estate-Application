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
import { json, useNavigate } from "react-router-dom";
export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openBlock, setBlock] = useState(false);
  const [password, setPassword] = useState("");
  const imageref = useRef(null);
  const [filename, setfilename] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [imgState, setimgState] = useState("");
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
      console.log(data);
      if (data.status == "fail") {
        throw new Error(data.message);
      }
      console.log(data);
      dispatch(insertingData({}));
      navigate("/sign-in");
    } catch (err) {
      console.log("signout", err);
      if (err.message.includes("Token")) {
        setError(err.message);
        dispatch(insertingData({}));
      } else {
        setError(err.message);
      }
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
        throw new Error(data1.message);
      }
      console.log(data1);
      dispatch(insertingData({}));
      navigate("/sign-in");
    } catch (err) {
      console.log("signout", err.message);
      if (err.message.includes("Token")) {
        setError(err.message);
        dispatch(insertingData({}));
      } else {
        setError(err.message);
      }
    }
  };
  console.log(data);
  useEffect(() => {
    if (filename) {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "_" + filename.name;
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, filename);
      setimgState("loading...");
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
            const call = async () => {
              try {
                const res = await fetch(`/api/user/updateimage/${data._id}`, {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({ downloadURL }),
                });
                const data1 = await res.json();
                dispatch(
                  insertingData({
                    ...data,
                    image: downloadURL,
                  })
                );
                console.log(data1);

                if (data1.status == "fail") {
                  throw new Error("Image Not Uploaded");
                }
                setimgState("Uploaded Successfully");
                setTimeout(() => {
                  setimgState("");
                }, 1000);
              } catch (err) {
                console.log(err);
                setimgState(err.message);
                setTimeout(() => {
                  setimgState("");
                }, 1000);
              }
            };
            call();
          });
        }
      );
    }
  }, [filename]);
  return (
    <div className="mb-10">
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
          className="rounded-full w-[6rem] h-[6rem] object-cover mb-3 "
        ></img>
        {imgState.length > 0 && (
          <span className="text-blue-900 font-bold">{imgState}</span>
        )}
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

        {error.length > 0 && error}
        <button
          onClick={signout}
          className="bg-blue-700 text-white p-3 px-[5.5rem] rounded-xl mt-3"
        >
          SignOut
        </button>
        <button
          onClick={deleteAcc}
          className=" text-white p-3 bg-red-700  px-[6rem] rounded-xl mt-3"
        >
          Delete
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setBlock(true);
          }}
          className="bg-gray-800 text-white p-3 px-[4rem] rounded-xl mt-3"
        >
          Reset Password
        </button>
        {success.length > 0 && (
          <span className="text-blue-700 font-semibold">{success}</span>
        )}
        {openBlock && (
          <input
            type="password"
            required
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
            disabled={password.length < 3}
            onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(
                  `/api/user/updatepassword/${data._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify({ password }),
                  }
                );
                const data1 = await response.json();
                console.log(data1);
                if (data.status == "fail") {
                  throw new Error("Failed to Update");
                }
                setSuccess(data1.message);
                setTimeout(() => {
                  setSuccess("");
                }, 1000);
                console.log(data1);
                setBlock(false);
              } catch (err) {
                console.log("update", err);
              }
            }}
            className="bg-red-800 disabled:bg-slate-300  text-white py-3 px-5 rounded-xl mt-3"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
