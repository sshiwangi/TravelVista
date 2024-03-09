import React, { useState, useContext } from "react";
import "./Auth.css";
import Input from "../../shared/componets/FormElements/Input";
import Card from "../../shared/componets/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/componets/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/componets/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/componets/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/componets/FormElements/ImageUpload";
import loginImg from "../../assets/login.png";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [signinClass, setSigninClass] = useState("bg-white");
  const [signupClass, setSignupClass] = useState("");

  const handleSigninClick = () => {
    setIsLoginMode(true);
    setSigninClass("bg-white");
    setSignupClass("");
  };

  const handleSignupClick = () => {
    setIsLoginMode(false);
    setSignupClass("bg-white");
    setSigninClass("");
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    // setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          formData
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="flex w-full gap-6 py-10 justify-center items-center lg:items-start">
        <Card className="authentication">
          {isLoading && <LoadingSpinner asOverlay />}
          <h2 className="login-header">Welcome Back!</h2>
          <h3 className="login-headline">
            Enter your details to log in to your account.
          </h3>
          {/* <hr /> */}
          <div className="flex mt-4 p-1.5 rounded-md justify-between items-center bg-[#F0F0F2] gap-3">
            <div
              style={{
                cursor: "pointer",
                justifyContent: "center",
                padding: "0.9rem 4rem",
                width: "50%",
                borderRadius: "0.375rem",
                "@media (max-width: 576px)": {
                  padding: "1rem 2rem",
                },
              }}
              className={signinClass}
              onClick={() => {
                handleSigninClick();
                switchModeHandler();
              }}
            >
              Signin
            </div>
            <div
              style={{
                cursor: "pointer",
                justifyContent: "center",
                padding: "0.9rem 4rem",
                width: "50%",
                borderRadius: "0.375rem",
                borderRadius: "0.375rem",
                "@media screen and (max-width: 576px)": {
                  padding: "1rem 2rem",
                },
              }}
              className={signupClass}
              onClick={() => {
                handleSignupClick();
                switchModeHandler();
              }}
            >
              Signup
            </div>
          </div>
          <form className="w-full lg:w-1/2" onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
                placeholder="Enter your name"
              />
            )}
            {!isLoginMode && (
              <ImageUpload
                center
                id="image"
                onInput={inputHandler}
                errorText="please provide an image"
              />
            )}
            <Input
              element="input"
              id="email"
              type="email"
              label="Your email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
              placeholder="Enter your email"
            />
            <Input
              element="input"
              id="password"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password, at least 6 characters."
              onInput={inputHandler}
              placeholder="Enter your password"
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          {/* <Button inverse onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button> */}
        </Card>
        <div className="hidden lg:h-full lg:w-1/2 lg:flex items-center justify-center">
          <img className="rounded-md" src={loginImg} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
