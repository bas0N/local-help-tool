import { TextField, Button } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "@mui/material";
import OAuth from "../Components/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        return navigate("/");
      }
    }
    return setError(true);
  };
  return (
    <>
      <div className="flex flex-col ">
        <header>
          <p>Esa</p>
        </header>
        <form className="flex flex-col gap-3 mx-6" onSubmit={onSubmit}>
          <TextField
            error={error}
            value={email}
            id="email"
            label="Email"
            variant="outlined"
            onChange={onChange}
          />

          <TextField
            error={error}
            value={password}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onChange}
          />
          {error && <p className="text-red-600">Invalid login credetials.</p>}
          <Link href="/forgot-password">Forgot password</Link>
          <Button
            type="submit"
            disabled={email.length === 0 || password.length < 8 ? true : false}
            variant="outlined"
          >
            Sign In
          </Button>
        </form>
        <OAuth />
        <Link className="self-center mt-6" href="/sign-up">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}

export default SignIn;
