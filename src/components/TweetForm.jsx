import React from "react";
import { auth, db } from "../firebase/config";
import img from "../assets/img.png";
import { BsCardImage } from "react-icons/bs";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const TweetForm = () => {
  // kolleksiyonun ref alma
  const tweetsCol = collection(db, "tweets");

  const handleSubmit = (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //Kolleksiyona döküman ekler
    addDoc(tweetsCol, {
      textContent,
      createdAt: serverTimestamp(),
      user: {
        id: auth.currentUser.uid,
        name: auth?.currentUser?.displayName,
        picture: auth?.currentUser?.photoURL
          ? auth?.currentUser?.photoURL
          : img,
      },
      likes: [],
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-2 border-gray-900"
    >
      <img
        className="rounded-full h-[50px]"
        src={auth.currentUser?.photoURL ? auth.currentUser?.photoURL : img}
      />
      <div className="w-full">
        <input
          className="w-full my-2 text-gray-400 outline-none bg-black placeholder:text-lg"
          placeholder="Neler Oluyor?"
          type="text"
        />
        <div className="flex justify-between h-[45px]">
          <div className="hover:bg-gray-800 transition p-4 cursor-pointer rounded-full">
            <label htmlFor="file-inp" className="cursor-pointer">
              <BsCardImage />
            </label>
            <input className="hidden" id="file-inp" type="file" />
          </div>
          <button className="bg-blue-600 px-4  rounded-full transition hover:bg-blue-500">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
