import React, { useEffect, useState } from "react";
import TweetForm from "./TweetForm";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Post from "./Post";
import { db } from "../firebase/config";

const Main = () => {
  const [tweets, setTweets] = useState(null);
  // kolleksiyonun referansını alma
  const tweetsCol = collection(db, "tweets");
  useEffect(() => {
    //filtreleme ayarlarını tanımlama
    const queryOptions = query(tweetsCol, orderBy("createdAt", "desc"));

    // kolleksiyondaki değişimi izler
    onSnapshot(queryOptions, (snapshot) => {
      // tweetleri geçici olarak tuttuğumuz dizi
      const liveTweets = [];

      // dökümanların verilerine erişip diziye aktarma
      snapshot.forEach((doc) => liveTweets.push({ ...doc.data(), id: doc.id }));

      setTweets(liveTweets);
    });
  }, []);

  return (
    <main className="col-span-4 md:col-span-3 border border-gray-800">
      <header className="font-bold p-4 border-b-2 border-[#4746466f]">
        Anasayfa
      </header>
      <TweetForm />
      {/* Loading */}

      {!tweets && <p className="text-center mt-[200px]">Loading...</p>}

      {/*atılan tweetlerin listelendiği alan*/}
      {tweets?.map((tweet) => (
        <Post tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
