import React, { ChangeEvent, MouseEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import googleIcon from "../assets/svg/googleIcon.svg";
import { Button } from "@mui/material";
function OAuth() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      //Check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      //if doesnt exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col self-center mt-6 gap-3 items-center ">
      {error && <p className="text-red-500">Could not authorize with google</p>}
      <p className="">
        Sign {location.pathname === "/sign-up" ? "Up " : "In "}with
      </p>
      <Button
        onClick={onGoogleClick}
        className="flex rounded-full aspect-square"
      >
        <img
          className="w-8 rounded-full shadow-xl drop-shadow-xl "
          src={googleIcon}
        />
      </Button>
    </div>
  );
}

export default OAuth;
