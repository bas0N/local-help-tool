import {
  InputAdornment,
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
  IconButton,
  Button,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { Link } from "@mui/material";
function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    charityid: "",
  });
  const [error, setError] = useState(true);
  const [emailError, setEmailError] = useState(true);
  const [firstnameError, setFirstnameError] = useState(true);
  const [lastnameError, setLastnameError] = useState(true);
  const [charityidError, setCharityidError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  const { email, password, firstname, lastname, charityid } = formData;
  const navigate = useNavigate();
  const isSubmitDisabled = () => {
    return (
      emailError ||
      firstnameError ||
      lastnameError ||
      charityidError ||
      passwordError
    );
  };
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailError(true);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (isValidEmail(e.target.value)) {
      setEmailError(false);
    }
    setSubmitDisabled(isSubmitDisabled());
  };
  const onFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstnameError(true);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.value.length > 5) {
      setFirstnameError(false);
    }
    setSubmitDisabled(isSubmitDisabled());
  };
  const onLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastnameError(true);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.value.length > 5) {
      setLastnameError(false);
    }
    setSubmitDisabled(isSubmitDisabled());
  };
  const onCharityIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCharityidError(true);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.value.length > 5 && Number.isInteger(Number(charityid))) {
      setCharityidError(false);
    }
    setSubmitDisabled(isSubmitDisabled());
  };
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordError(true);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    if (e.target.value.length > 7) {
      setPasswordError(false);
    }
    setSubmitDisabled(isSubmitDisabled());
  };

  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onSubmit = () => {
    if (isValidEmail(email)) {
      return navigate("/");
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
            error={emailError}
            value={email}
            id="email"
            label="Email"
            variant="outlined"
            onChange={onEmailChange}
          />
          {emailError && <p className="text-red-600">Invalid input.</p>}

          <TextField
            error={firstnameError}
            value={firstname}
            id="firstname"
            label="FirstName"
            variant="outlined"
            onChange={onFirstNameChange}
          />
          {firstnameError && <p className="text-red-600">Invalid input.</p>}
          <TextField
            error={lastnameError}
            value={lastname}
            id="lastname"
            label="LastName"
            variant="outlined"
            onChange={onLastNameChange}
          />
          {lastnameError && <p className="text-red-600">Invalid input.</p>}
          <TextField
            error={charityidError}
            value={charityid}
            id="charityid"
            label="Charity Id"
            variant="outlined"
            onChange={onCharityIdChange}
          />
          {charityidError && <p className="text-red-600">Invalid input.</p>}
          <TextField
            error={passwordError}
            value={password}
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          />
          {passwordError && <p className="text-red-600">Invalid input.</p>}
          <Button type="submit" disabled={submitDisabled} variant="outlined">
            Sign Up
          </Button>
        </form>
        {/*Google oAuth */}
        <Link className="self-center mt-6" href="/sign-up">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
