import React, { ChangeEvent, useEffect, useState } from "react";
import { User } from "firebase/auth";

import { getAuth, updateProfile } from "firebase/auth";
import { Button, TextField } from "@mui/material";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const [error, setError] = useState(false);

  const auth = getAuth();

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });
  const { name, email } = formData;
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  // console.log();
  console.log(auth.currentUser?.uid);
  const userRef = doc(db, "users", auth.currentUser?.uid as string);
  const execute = async () => {
    const docolo = await getDoc(userRef);
    console.log(docolo.data());
  };
  execute();
  useEffect(() => {}, []);
  const onSubmit = async () => {
    try {
      if (
        auth.currentUser?.displayName !== undefined &&
        auth.currentUser?.displayName !== name
      ) {
        await updateProfile(auth.currentUser, { displayName: name });
        const userRef = doc(db, "users", auth.currentUser?.uid as string);
        await updateDoc(userRef, { name });
      } else {
        return setError(true);
      }
    } catch (err) {
      console.log(err);

      return setError(true);
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col">
      <header>
        <div className="flex justify-between">
          <p>Header</p>
          <p>{formData.name}</p>
          <Button onClick={onLogout} variant="outlined">
            Log out
          </Button>
        </div>
      </header>
      <main>
        <div className="flex justify-between">
          <p className="text-3xl font-extrabold">Personal Details</p>
          <p
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div>
          <form className="flex flex-col">
            <TextField
              disabled={!changeDetails}
              id="name"
              label="FirstName"
              variant="outlined"
              value={name}
              onChange={onChange}
            />
            <TextField
              disabled={!changeDetails}
              id="email"
              variant="outlined"
              value={email}
              onChange={onChange}
            />
            <p className="text-red-600">{error && "Cannot update data."}</p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
