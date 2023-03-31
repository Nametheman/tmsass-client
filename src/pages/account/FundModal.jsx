import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { toast, Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const FundModal = ({ setShowFundModal }) => {
  const clientId = JSON.parse(sessionStorage.getItem("clientId"));
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [fundAmt, setFundAmt] = useState("");
  const [payURL, setPayUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [verifyFundModal, setVerifyFundModal] = useState(false);
  const handleFunding = () => {
    console.log(fundAmt);
    fundWalletHandler();

    // setShowFundModal(false);
  };
  const urlParams = new URLSearchParams(window.location.search);
  const trxref = urlParams.get("trxref");
  const location = window.location.href;
  console.log(window.location.href);

  console.log(trxref);
  useEffect(() => {
    console.log(trxref);
  }, [trxref]);

  // console.log(first)

  const fundWalletHandler = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/client/fund/${clientId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: `${fundAmt}`,
            redirectUrl: `${location}`,
          }),
        }
      );
      const data = await response.json();
      setLoading(false);
      console.log(response);
      if (data.message === "Success") {
        setPayUrl(data?.data?.url);
        const redirect = document.createElement("a");
        redirect.href = data?.data?.url;
        redirect.click();
      }
      if (response.status !== 200) {
        toast.error(data?.error);
      }
    } catch (error) {
      console.log(error);
      toast.success("Copied!");
      setLoading(false);
    }
  };
  return createPortal(
    <ModalWrapper>
      <Modal>
        <div className="closeIcon">
          <GrFormClose
            size={30}
            onClick={() => {
              setShowFundModal(false);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="modalContent">
          <p>Enter amount to fund wallet with.</p>
          <input
            type="number"
            placeholder="Enter amount"
            value={fundAmt}
            onChange={(e) => {
              const newValue = e.target.value.replace(/,/g, "");
              setFundAmt(newValue.toLocaleString());
            }}
          />
          <button
            disabled={fundAmt === "" || loading ? true : false}
            onClick={handleFunding}
          >
            {loading ? (
              <ThreeDots
                height="50"
                width="50"
                radius="9"
                color="#fff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{
                  display: "flex",
                  justifyContent: "center",
                }}
                wrapperClassName=""
                visible={true}
              />
            ) : (
              "Proceed"
            )}
          </button>
        </div>
      </Modal>
    </ModalWrapper>,
    document.getElementById("fundModal")
  );
};

export default FundModal;

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  background-color: #fff;
  width: 500px;
  min-height: 280px;
  padding: 30px;
  border-radius: 15px;

  .closeIcon {
    display: flex;
    justify-content: flex-end;
  }
  .modalContent {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    p {
      font-size: 21px;
      font-weight: 500;
    }

    input {
      border: 1px solid #28d1ff;
      height: 50px;
      padding: 0 15px;
      border-radius: 5px;

      &::placeholder {
        color: #909090;
      }

      &:active,
      &:focus {
        border: 1px solid #28d1ff;
        outline: none;
      }
    }

    button {
      background-color: #28d1ff;
      height: 50px;
      border: none;
      outline: none;
      color: #fff;
      font-size: 17px;
      cursor: pointer;
      border-radius: 5px;

      :disabled {
        background-color: #3d3d3d;
        cursor: not-allowed;
      }
    }
  }
`;
