import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth } from "../firebase/config";
import { arrayRemove } from "firebase/firestore";

const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);

  // tarih bilgisne erişme
  const date = tweet.createdAt?.toDate();

  // kullanıcının tweet'i beğenip beğenmediğine bakma
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);

    setIsLiked(found);
  }, [tweet]);

  // kullanıcı likelamışsa kaldırır, yoksa ekler
  const toggleLike = () => {
    // güncellenicek tweet'in referansı alma
    const tweetRef = doc(db, "tweets", tweet.id);

    // aktif kullanıcıyı tweet'in likes dizisine ekleme
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="flex gap-3 p-3 border-b-[0.5px] border-gray-600 ">
      <img className="w-14 h-14 rounded-full" src={tweet.user.picture} alt="" />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet?.user?.name}</p>
            <p className="text-gray-400">{tweet?.user?.name?.toLowerCase()}</p>
            <p className="text-gray-400">1 Saat önce</p>
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-600">
            <BsThreeDots />
          </div>
        </div>
        <div className="my-3">
          <p>{tweet.textContent}</p>
        </div>
        <div className="flex justify-between pe-4">
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-600">
            <BiMessageRounded />
          </div>
          <div
            onClick={toggleLike}
            className="flex items-center gap-3 p-2 rounded-full transition cursor-pointer hover:bg-gray-600"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet?.likes?.length}</span>
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-600">
            <FaRetweet />
          </div>
          <div className="p-2 rounded-full transition cursor-pointer hover:bg-gray-600">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
