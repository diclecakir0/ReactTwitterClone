import React from "react";
import Nav from "../components/Nav";
import Aside from "../components/Aside";
import Main from "../components/Main";

const Feed = () => {
  return (
    <div className="bg-black text-white min-h-[100vh] overflow-y-hidden">
      <div className="grid grid-cols-5">
        <Nav />
        <Main />
        <Aside />
      </div>
    </div>
  );
};

export default Feed;
