import React from "react";
import styled from "styled-components";
import totaltxnImg from "../assets/images/totaltxn.svg";
import totaltxnvalImg from "../assets/images/totaltxnval.svg";
import totalcommImg from "../assets/images/totcomm.svg";
import arrIncrease from "../assets/icons/arrIncrease.svg";

const Totaltxnvalue = () => {
  return (
    <Container>
      <div className="u_head">
        <p>Total Transaction Value</p>
        <img src={totaltxnvalImg} alt="" />
      </div>
      <p className="u_balance">#3,000,000</p>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <img src={arrIncrease} alt="" style={{ marginTop: "19px" }} />
        <p className="change_rate">
          <span style={{ color: "#008000" }}>1.3%</span> up from last week
        </p>
      </div>
    </Container>
  );
};

export default Totaltxnvalue;
const Container = styled.div`
  .u_head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      font-size: 13px;
      font-weight: bold;
      color: #0d6efd;
    }
    img {
      width: 50px;
    }
  }
  .u_balance {
    font-size: 30px;
    font-weight: bold;
    color: #0d6efd;

    /* margin-top: 10px; */
    /* letter-spacing: 0.2pt; */
  }

  .change_rate {
    margin-top: 20px;
    font-size: 10px;
  }
`;
