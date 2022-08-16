import React, { ChangeEvent, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField, Link, Button } from "@mui/material";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    display: false,
    color: "green",
    message: "Added succesfully",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setStatus({
        display: true,
        color: "green",
        message: "Sent succesfully",
      });
    } catch (err) {
      console.log(err);
      setStatus({
        display: true,
        color: "red",
        message: "Error while sending",
      });
    }
  };
  return (
    <div className="container flex flex-col">
      <header>
        <p className="text-3xl">Forgot Password</p>
      </header>
      <main>
        <div></div>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <TextField
            onChange={onChange}
            value={email}
            id="outlined"
            label="Insert email"
            defaultValue="Email"
          />
          <Link href="/sign-in">Sign In</Link>
          <Button type="submit" variant="outlined">
            Send Reset Link
          </Button>
          {status.display && (
            <p className={`text-${status.color}-500`}>{status.message}</p>
          )}
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
