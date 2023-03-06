import React, { useState } from "react";
import styled from "styled-components";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const Ubalance = () => {
  const [showBalance, setShowBalance] = useState(false);
  return (
    <Container>
      <div className="u_head">
        <p>U-Balance</p>
        <div
          onClick={() => {
            setShowBalance(!showBalance);
          }}
        >
          {showBalance ? <AiFillEye /> : <AiFillEyeInvisible />}
        </div>
      </div>
      <p className="u_balance">#{showBalance ? "9,000,000" : "*********"}</p>
    </Container>
  );
};

export default Ubalance;

const Container = styled.div`
  .u_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    margin-top: 20px;

    p {
      font-size: 13px;
      font-weight: bold;
    }
    svg {
      color: #00000080;
      cursor: pointer;
    }
  }
  .u_balance {
    font-size: 27px;
    font-weight: bold;
    margin-top: 10px;
    /* letter-spacing: 0.2pt; */
  }
`;
