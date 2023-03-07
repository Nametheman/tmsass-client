import React, { useState } from "react";
import styled from "styled-components";
import alarmSvg from "../../assets/images/alarm.svg";
import userAvi from "../../assets/images/dummyAvi.svg";
import { RxCaretDown } from "react-icons/rx";
import balanceCard from "../../assets/images/card.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import fundBtn from "../../assets/images/fundBtn.svg";
import fundHoverBtn from "../../assets/images/fundHover.svg";
import historyBtn from "../../assets/images/historyBtn.svg";
import historyHoverBtn from "../../assets/images/historyHover.svg";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [fundHover, setFundHover] = useState(false);
  const [historyHover, setHistoryHover] = useState(false);

  const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
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
        width: 335px;
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
          <div className="userProfileWrapper">
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
                  {showBalance ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>{" "}
              </div>
              <p className="balance">
                #{showBalance ? "3,000,000" : "*********"}
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
          >
            <span className="fundBtn">
              <img src={fundBtn} alt="" />
            </span>
            <span className="fundHover">
              <img src={fundHoverBtn} alt="" />
            </span>
          </div>
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
        </ActionWrapper>
      </div>
    </Container>
  );
};

export default Home;

const Container = styled.section`
  padding: 30px;
  position: absolute;
  top: 0;

  width: 100%;

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
