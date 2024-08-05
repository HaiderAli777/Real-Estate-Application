import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navigate() {
  const data = useSelector((state) => state.user.userdata);
  const keys = Object.keys(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (keys.length == 0) {
      navigate("/sign-in");
    } else {
      navigate("/home");
    }
  }, []);
  console.log("Hello from navigate");
  return <div></div>;
}
