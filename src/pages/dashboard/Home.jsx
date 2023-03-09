import React, { useState, useEffect } from "react";
import styled from "styled-components";
import alarmSvg from "../../assets/images/alarm.svg";
import userAvi from "../../assets/images/dummyAvi.svg";
import { RxCaretDown } from "react-icons/rx";
import Ubalance from "../../components/Ubalance";
import TotalTxnCount from "../../components/TotalTxnCount";
import Totaltxnvalue from "../../components/TotalTxnValue";
import Totalcommission from "../../components/Totalcomm";
import ReusableTable from "../../reusables/ReusableTable";

const Home = () => {
  const [mydata, setMyData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [recentTxnData, setRecentTxnData] = useState();
  const [init, setInit] = useState(1);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const clientId = JSON.parse(sessionStorage.getItem("clientId"));
  useEffect(() => {
    getDashboard();
  }, [token]);
  useEffect(() => {
    getRecentTransactions();
  }, [clientId]);

  //Table column goes in here. This is to be passed as props/////////////////////////////
  const columns = [
    { field: "no", header: "S/N" },
    { field: "txnID", header: "TRANSACTION ID" },
    { field: "serviceName", header: "SERVICE NAME" },
    { field: "billerName", header: "BILLER NAME" },
    { field: "amount", header: "AMOUNT" },
    { field: "netVal", header: "NET VALUE" },
    { field: "commission", header: "COMMISSION" },
    { field: "date", header: "DATE" },
    { field: "status", header: "STATUS" },
  ];
  //APIs section starts here ////////////////////////////////////////////////////////////
  const getDashboard = async () => {
    try {
      const response = await fetch(
        `http://89.38.135.41:4457/v1/client/${clientId}`,
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
      setMyData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentTransactions = async () => {
    try {
      const response = await fetch(
        `http://89.38.135.41:4457/v1/transactions/billing/${clientId}?page=${page}&startDate=2022-09-13&endDate=2022-12-01&limit=${limit}`,
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
      setRecentTxnData(data);
    } catch (error) {
      console.log(error);
    }
  };
  //APIs section ends here ////////////////////////////////////////////////////////////

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
          <p className="pageName">Overview</p>
          <div className="filterWrapper">
            <p style={{ fontWeight: "500" }}>Filter By :</p>
            <select name="" id="">
              <option value="All"> All</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
          </div>
        </div>

        <div className="accountInfoWrapper">
          <Card>
            <Ubalance balance={mydata?.data?.wallet?.balance} />
          </Card>
          <Card>
            <TotalTxnCount />
          </Card>
          <Card>
            <Totaltxnvalue />
          </Card>
          <Card>
            <Totalcommission />
          </Card>
        </div>

        <p className="recentCustomers">Recent Transactions</p>

        <TableWrapper>
          <ReusableTable
            type="recent"
            data={recentTxnData?.data}
            columns={columns}
            init={init}
          />
        </TableWrapper>
      </div>
    </Container>
  );
};

export default Home;
const Container = styled.div`
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
    padding: 20px 0 80px;
    border-radius: 20px;
    margin-top: 50px;

    .firstContentHead {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pageName {
        font-size: 30px;
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

    .accountInfoWrapper {
      display: flex;
      gap: 12px;
      margin-top: 10px;
      flex-wrap: wrap;
      padding: 20px;
    }

    .recentCustomers {
      margin-top: 40px;
      font-size: 30px;
      padding: 20px;
    }
  }
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.2);
  flex: 1 0 16rem;
  padding: 10px 15px;
  border-radius: 10px;
  min-height: 150px;
`;

const TableWrapper = styled.div`
  /* margin: 20px 0; */
`;
