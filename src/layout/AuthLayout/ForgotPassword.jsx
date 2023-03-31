import React, { useState } from "react";
import { createPortal } from "react-dom";
import { ModalWrapper, Modal } from "../../pages/account/FundModal";
import { GrFormClose } from "react-icons/gr";
import OtpInput from "react-otp-input";
import success from "../../assets/icons/success.svg";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = ({ setShowForgotPass }) => {
  const [emailReset, setEmailReset] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetModal, setShowReset] = useState(false);
  const [showForgot, setShowForgot] = useState(true);
  const [otp, setOtp] = useState("");
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);
  const [resetInitializeLoading, setResetInitializeLoading] = useState(false);

  const handleFunding = () => {
    setShowForgotPass(false);
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
  };

  const sendResetRequest = async () => {
    try {
      setResetInitializeLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}password/reset?type=email&value=${emailReset}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setResetInitializeLoading(false);

      if (response.status === 200 && data?.message === "Success") {
        setShowForgot(false);
        toast.success(data?.data);
        setShowReset(true);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      setResetInitializeLoading(false);
    }
  };
  const verifyResetRequest = async () => {
    try {
      setResetInitializeLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}password/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "email",
            value: `${emailReset}`,
            code: `${otp}`,
            password: `${confirmPassword}`,
          }),
        }
      );
      const data = await response.json();
      setResetInitializeLoading(false);

      if (response.status === 200) {
        setShowReset(false);
        setPassChangeSuccess(true);
      } else {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      setResetInitializeLoading(false);
    }
  };
  const initializeReset = () => {
    sendResetRequest();
  };
  const handleResetVerify = () => {
    verifyResetRequest();
  };
  return createPortal(
    <ModalWrapper>
      {showForgot && (
        <Modal>
          <div className="closeIcon">
            <GrFormClose
              size={30}
              onClick={() => {
                setShowForgotPass(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modalContent">
            <p>Forgot Password?</p>
            <p style={{ fontSize: "13px", marginTop: "2px" }}>
              Enter email to continue password ecovery process.
            </p>
            <input
              type="text"
              placeholder="Enter your email address"
              value={emailReset}
              onChange={(e) => {
                setEmailReset(e.target.value);
              }}
              style={{ borderLeft: "6px solid #28d1ff" }}
            />
            <button
              disabled={
                emailReset === "" && resetInitializeLoading ? true : false
              }
              onClick={initializeReset}
            >
              {resetInitializeLoading ? "Please wait..." : "Submit"}
            </button>
          </div>
        </Modal>
      )}
      {showResetModal && (
        <Modal>
          <div className="closeIcon">
            <GrFormClose
              size={30}
              onClick={() => {
                setShowForgotPass(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modalContent">
            <p>Enter code received</p>

            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>}
              inputStyle={{ width: "50px" }}
              containerStyle={{ justifyContent: "space-between" }}
            />

            <input
              type="password"
              placeholder="Create new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              style={{ borderLeft: "6px solid #28d1ff" }}
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              style={{ borderLeft: "6px solid #28d1ff" }}
            />
            <button
              disabled={
                confirmPassword === "" || confirmPassword !== newPassword
                  ? true
                  : false
              }
              onClick={handleResetVerify}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
      {passChangeSuccess && (
        <Modal>
          <div className="closeIcon">
            <GrFormClose
              size={30}
              onClick={() => {
                setShowForgotPass(false);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="modalContent">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={success} alt="" />
            </div>
            <p style={{ fontSize: "16px", textAlign: "center" }}>
              Password has been changed successfully
            </p>
            <button
              onClick={() => {
                setShowForgotPass(false);
              }}
            >
              Continue to login
            </button>
          </div>
        </Modal>
      )}
    </ModalWrapper>,
    document.getElementById("forgotPasswordModal")
  );
};

export default ForgotPassword;
