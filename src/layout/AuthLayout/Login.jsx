import React, { useState } from "react";
import styled from "styled-components";
import loginImg from "../../assets/images/login.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailInputTouched, setEmailInputTouched] = useState(false);
  const [passwordInputTouched, setPasswordInputTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formIsValid1, setFormIsValid1] = useState(false);
  const [formIsValid2, setFormIsValid2] = useState(false);
  // const
  const errors = {};

  const handleEmail = (e) => {
    setEnteredEmail(e.target.value);

    if (e.target.value.length >= 4) {
      setFormIsValid1(true);
    } else {
      errors.email = "Enter a correct email";
      setFormIsValid1(false);
    }
    console.log(enteredEmail, formIsValid1);
  };
  const handlePassword = (e) => {
    setEnteredPassword(e.target.value);

    if (e.target.value.length >= 7) {
      setFormIsValid2(true);
    } else {
      errors.password = "Field is required";
      setFormIsValid2(false);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setEnteredEmail("");
    setEnteredPassword("");
    setErrorMessage(errors);
    setFormIsValid1(false);
    setFormIsValid2(false);
    AuthUser();
  };

  const AuthUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://89.38.135.41:4457/v1/auths/login`, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (
        response.status === 200 &&
        data?.message === "Success" &&
        data?.data?.token
      ) {
        sessionStorage.setItem("token", JSON.stringify(data?.data?.token));
        sessionStorage.setItem(
          "clientId",
          JSON.stringify(data?.data?.client?.clientId)
        );
        navigate("/dashboard");
      } else {
        setErrorMessage(data?.error);
        // setShowErrorMessage(true);
        // alert(data?.error);
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      // setErrorMessage(error.message);
      // alert(errorMessage);
    }
  };

  const LoginBtn = styled.button`
    width: 100%;
    margin-top: 40px;
    padding: 15px 0;
    font-size: 17px;
    border: none;
    outline: none;
    color: #fff;
    background-color: #28d1ff;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
      background-color: #323232;
      color: #c6c3c3;
      cursor: not-allowed;
    }
  `;

  return (
    <Container>
      <div className="left-pane">
        <img src={loginImg} alt="" />
      </div>
      <div className="right-pane">
        <div className="head">
          <h3>Login Account</h3>
        </div>
        <div className="loginFormWrapper">
          <p>Login to manage your account.</p>
          <form action="" onSubmit={handleFormSubmit}>
            <div className="usernameWrapper">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                value={enteredEmail}
                onChange={handleEmail}
                onBlur={handleEmail}
                onFocus={() => {
                  setEmailInputTouched(true);
                }}
              />
              {/* <p className="errorMsg">{errorMessage.email}</p> */}
            </div>
            <div className="passwordWrapper">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={enteredPassword}
                onChange={handlePassword}
                onBlur={handlePassword}
                onFocus={() => {
                  setPasswordInputTouched(true);
                }}
              />
              {/* <p className="errorMsg">hi</p> */}
            </div>

            <div className="userInteractions">
              <p style={{ color: "#909090" }}>
                Don't have an account ?,{" "}
                <span style={{ color: "#28d1ff", cursor: "pointer" }}>
                  Sign Up
                </span>
              </p>
              <p style={{ cursor: "pointer" }}>Forgot Password ?</p>
            </div>

            <LoginBtn
              disabled={formIsValid1 && formIsValid2 ? false : true}
            >{`${loading ? "Please wait..." : "Sign In"}`}</LoginBtn>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
  .left-pane {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #28d1ff;

    img {
      width: 70%;
    }
  }
  .right-pane {
    flex: 1;
    background-color: #fff;
    .head {
      text-align: center;
      margin-top: 180px;

      h3 {
        font-size: 40px;
        color: #28d1ff;
      }
    }
    .loginFormWrapper {
      padding: 0 120px;
      margin-top: 40px;

      p {
        color: #28d1ff;
        font-size: 16px;
        font-weight: 500;
      }

      form {
        margin-top: 40px;
        .usernameWrapper {
          input {
            width: 100%;
            padding: 14px 40px;
            border: 1px solid #28d1ff;
            font-size: 16px;
            outline: none;
            border-left: 7px solid #28d1ff;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            &::placeholder {
              color: #909090;
              font-size: 14px;
            }
          }
          .errorMsg {
            color: red;
            margin-left: 5px;
            font-size: 12px;
            margin-top: 4px;
          }
        }
        .passwordWrapper {
          margin-top: 30px;
          input {
            width: 100%;
            padding: 14px 40px;
            border: 1px solid #28d1ff;
            font-size: 16px;
            outline: none;
            border-left: 7px solid #28d1ff;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            &::placeholder {
              color: #909090;
              font-size: 14px;
            }
          }
          .errorMsg {
            color: red;
            margin-left: 5px;
            font-size: 12px;
            margin-top: 4px;
          }
        }

        .userInteractions {
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
`;
