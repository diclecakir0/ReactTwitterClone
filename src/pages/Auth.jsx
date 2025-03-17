import React from "react";
import google from "../assets/google.png";
import { useState } from "react";
import { auth, provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "react-toastify";

const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      // Kaydol > kullanıcı oluşturucaz
      createUserWithEmailAndPassword(auth, email, pass).catch((err) =>
        toast.error(err.code)
      );
    } else {
      // giriş yap > varolan hesaba giriş
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        toast.error(err.code);
        // şifre hatası varsa state'i güncelle
        if (err.code === "auth/wrong-password") {
          setIsError(true);
        }
      });
    }
  };

  // şifre sıfırlar

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Mailinizi kontrol edin"))
      .catch((err) => toast.error(err.code));
  };

  const handleGoogle = () => {
    signInWithRedirect(auth, provider).catch((err) => toast.error(err));
  };

  return (
    <div className="h-[100vh] bg-zinc-700 grid place-items-center">
      <div className="bg-slate-600 text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img src="/x.png" alt="" />
        </div>
        <h1 className="text-center font-bold text-xl">Twitter'a giriş yap</h1>
        <div
          onClick={handleGoogle}
          className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200"
        >
          <img src={google} alt="" />
          <p className="whitespace-nowrap">Google İle giriş yap</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded bg-white p-2 shadow shadow-white"
            type="email"
          />

          <label>Password</label>
          <input
            className="text-black rounded bg-white p-2 shadow shadow-white"
            type="password"
          />

          <button
            className="bg-white text-black mt10 rounded-full p-1 font-bold mt-10"
            type="submit"
          >
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className="text-gray-500 mt-5">
            <span>Hesabınız yok mu?</span>
            <button
              onClick={() => setSignUp(!signUp)}
              className="mx-3 text-blue-500"
              type="button"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </button>
          </p>
          {/* Kullanıcı giriş yap modundaysa ve hata varsa gözükür */}
          {!signUp && isError && (
            <button
              type="button"
              className="text-red-400 mt-5"
              onClick={handleReset}
            >
              Şifremi unuttum
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
