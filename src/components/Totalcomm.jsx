import React from "react";
import styled from "styled-components";
import totaltxnImg from "../assets/images/totaltxn.svg";
import totaltxnvalImg from "../assets/images/totaltxnval.svg";
import totalcommImg from "../assets/images/totcomm.svg";
import arrIncrease from "../assets/icons/arrIncrease.svg";

const Totalcommission = ({ txnComm }) => {
  return (
    <Container>
      <div className="u_head">
        <p>Total Commission</p>
        <img src={totaltxnvalImg} alt="" />
      </div>
      <p className="u_balance">₦{txnComm?.toLocaleString()}</p>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src={arrIncrease} alt="" style={{ marginTop: "19px" }} />
        <p className="change_rate">
          <span style={{ color: "#008000" }}>1.3%</span> up from last week
        </p>
      </div>
    </Container>
  );
};

export default Totalcommission;
const Container = styled.div`
  .u_head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 13px;
      font-weight: bold;
      color: #46b07d;
    }
    img {
      width: 50px;
    }
  }
  .u_balance {
    font-size: 30px;
    font-weight: bold;
    color: #46b07d;

    /* margin-top: 10px; */
    /* letter-spacing: 0.2pt; */
  }

  .change_rate {
    margin-top: 20px;
    font-size: 10px;
  }
`;
