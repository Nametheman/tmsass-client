import React, { useState, useEffect } from "react";
import styled from "styled-components";
import alarmSvg from "../../assets/images/alarm.svg";
import userAvi from "../../assets/images/dummyAvi.svg";
import { RxCaretDown } from "react-icons/rx";
import balanceCard from "../../assets/images/card.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import fundBtn from "../../assets/images/fundBtn.svg";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import fundBtn from "../../assets/images/fundBtn.svg";
import fundHoverBtn from "../../assets/images/fundHover.svg";
import historyBtn from "../../assets/images/historyBtn.svg";
import historyHoverBtn from "../../assets/images/historyHover.svg";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import History from "../history/History";
import FundModal from "./FundModal";
import { toast } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [fundHover, setFundHover] = useState(false);
  const [historyHover, setHistoryHover] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [balance, setBalance] = useState();
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage.getItem("token"));
  const clientId = JSON.parse(sessionStorage.getItem("clientId"));
  const clientId2 = JSON.parse(sessionStorage.getItem("clientId2"));
  useEffect(() => {
    getDashboard();
  }, [token]);

  const urlParams = new URLSearchParams(window.location.search);
  const trxref = urlParams.get("trxref");
  // const location = window.location.href;
  // console.log(window.location.href);

  console.log(trxref);
  useEffect(() => {
    if (trxref) {
      // verifyFund();
      toast.promise(verifyFund(), {
        pending: "Loading",
        success: "Account Funded Successfully",
        error: "Something went wrong! Please Refresh Page",
      });
    }
    // const myPromise = verifyFund();

    // toast.promise(myPromise, {
    //   loading: "Loading",
    //   success: "Got the data",
    //   error: "Error when fetching",
    // });
  }, [trxref]);

  const getDashboard = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}client/${clientId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setBalance(data?.data?.wallet?.balance);
    } catch (error) {
      console.log(error);
    }
  };

  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // const verifyFund2 = async () => {
  //   await axios
  //     .post(
  //       `${process.env.REACT_APP_BASE_URL}/client/fund/${clientId2}/verify`,
  //       { transactionId: trxref },
  //       config
  //     )
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };
  const verifyFund = async () => {
    try {
      setIsVerifying(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/client/fund/${clientId2}/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId: trxref }),
        }
      );
      const data = await response.json();
      setIsVerifying(false);
      if (data.message === "Success") {
        navigate("/account");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsVerifying(false);
    }
  };

  const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    margin-top: 40px;
    gap: 30px;

    .fundContainer {
      cursor: pointer;
      img {
        width: 250px;
        transition: all 0.3s ease-in-out;
      }
      .fundBtn {
        display: ${fundHover ? "none" : ""};
      }
      .fundHover {
        display: ${!fundHover ? "none" : ""};
      }
    }
    .historyContainer {
      cursor: pointer;
      img {
        width: 250px;
      }
      .historyBtn {
        display: ${historyHover ? "none" : ""};
      }
      .historyHover {
        display: ${!historyHover ? "none" : ""};
      }
    }
  `;

  return (
    <Container>
      <div className="head">
        <div className="head_content">
          <img src={alarmSvg} alt="" />
          <div
            className="userProfileWrapper"
            onClick={() => {
              navigate("/dashboard/profile-settings");
            }}
          >
            <img src={userAvi} alt="" />
            <div className="userInfo">
              <p style={{ fontWeight: "bold" }}>CIT MFB</p>
              <p style={{ fontSize: "11px", fontWeight: "bold" }}>User</p>
            </div>
            <RxCaretDown size={17} style={{ color: "#fff" }} />
          </div>
        </div>
      </div>
      <div className="contentWrapper">
        <div className="firstContentHead">
          <p className="pageName">
            Accounts: <em>Wallet Balance</em>
          </p>
        </div>
        <div className="content">
          <div className="balanceView">
            <img src={balanceCard} alt="" />
            <div className="balanceContent">
              <div className="balance_head">
                <p>U-Balance</p>
                <div
                  onClick={() => {
                    setShowBalance(!showBalance);
                  }}
                >
                  {showBalance ? <BsEye /> : <BsEyeSlash />}
                </div>{" "}
              </div>
              <p className="balance">
                ₦{showBalance ? balance?.toLocaleString() : "*********"}
              </p>{" "}
            </div>
          </div>
        </div>

        <ActionWrapper>
          <div
            className="fundContainer"
            onMouseOver={() => {
              setFundHover(true);
            }}
            onMouseLeave={() => {
              setFundHover(false);
            }}
            onClick={() => {
              setShowFundModal(true);
            }}
          >
            <span className="fundBtn">
              <img src={fundBtn} alt="" />
            </span>
            <span className="fundHover">
              <img src={fundHoverBtn} alt="" />
            </span>
          </div>

          <Link to="/account/deposit-history">
            <div
              className="historyContainer"
              onMouseOver={() => {
                setHistoryHover(true);
              }}
              onMouseLeave={() => {
                setHistoryHover(false);
              }}
            >
              <span className="historyBtn">
                <img src={historyBtn} alt="" />
              </span>
              <span className="historyHover">
                <img src={historyHoverBtn} alt="" />
              </span>
            </div>
          </Link>
        </ActionWrapper>
      </div>
      {showFundModal && <FundModal setShowFundModal={setShowFundModal} />}
      {isVerifying && (
        <Rings
          height="80"
          width="80"
          color="#28d1ff"
          radius="6"
          elementStyle={{
            position: "absolute",
            bottom: "0",
          }}
          wrapperStyle={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            "background-color": "rgba(0, 0, 0, 0.371)",
            "z-index": "1000",
          }}
          wrapperClass="loadingEl"
          visible={true}
          ariaLabel="rings-loading"
        />
      )}
    </Container>
  );
};

export default Home;

const Container = styled.section`
  padding: 30px;
  position: absolute;
  top: 0;
  width: calc(100% - 16%);
  max-width: calc(100% - 16%);

  .head {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .head_content {
      display: flex;
      width: 300px;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      .userProfileWrapper {
        width: 200px;
        border-left: 1px solid #eeebeb;
        padding-left: 40px;
        display: flex;
        align-items: center;
        gap: 15px;

        .userInfo {
          display: flex;
          flex-direction: column;
          gap: 15px;
          color: #fff;
          /* align-items: center; */
        }
      }
    }
  }

  .contentWrapper {
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    margin-top: 50px;

    .firstContentHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pageName {
        font-size: 30px;

        em {
          font-size: 25px;
        }
      }
      .filterWrapper {
        display: flex;
        align-items: center;
        gap: 15px;

        select {
          border: 1px solid #00000047;
          border-radius: 5px;
          padding: 5px;
        }
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 40px;
      margin-top: 40px;

      .balanceView {
        width: 600px;
        position: relative;
        img {
          width: 100%;
        }
        .balanceContent {
          position: absolute;
          padding: 0 40px;
          top: 60px;
          width: 100%;

          .balance_head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #fff;

            p {
              font-size: 25px;
              font-weight: 600;
            }
            svg {
              font-size: 40px;
              opacity: 0.6;
              cursor: pointer;
              transition: 0.2s ease-out;

              &:hover {
                opacity: 0.8;
              }
            }
          }

          .balance {
            margin-top: 20px;
            color: #fff;
            font-weight: 600;
            font-size: 45px;
            user-select: none;
          }
        }
      }
    }
  }
`;
