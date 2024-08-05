import React from "react";
import { useSelector } from "react-redux";
export default function Home() {
  const data = useSelector((state) => state.user.userdata);
  console.log(data);
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
}
