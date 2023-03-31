import React, { useState, useEffect } from "react";
import styled from "styled-components";
import alarmSvg from "../../assets/images/alarm.svg";
import userAvi from "../../assets/images/dummyAvi.svg";
import cloud from "../../assets/icons/cloud.svg";
import { RxCaretDown } from "react-icons/rx";
import ReusableTable from "../../reusables/ReusableTable";
import Filter from "./Filter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../../assets/icons/calendar.svg";
import filter from "../../assets/icons/filter.svg";
import search from "../../assets/icons/search.svg";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// imort dateFilter

const History = () => {
  const [init, setInit] = useState(1);
  const [page, setPage] = useState(1);
  const [txnData, setTxnData] = useState();
  const [limit, setLimit] = useState(10);
  const [mydata, setMyData] = useState();
  const [postsPerPage, setPostsPerOage] = useState(10);
  const [recentTxnData, setRecentTxnData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [endNumber, setEndNumber] = useState(indexOfLastPost);
  const [startCount, setStartCount] = useState(currentPage);
  const [endCount, setEndCount] = useState(currentPage * 10);
  const [startPoint, setStartPoint] = useState(0);
  const [endPoint, setEndPoint] = useState(5);
  const [isLastPage, setIsLastPage] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2020-03-16T14:30:00"));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  let num = 1;

  const clientId = JSON.parse(sessionStorage.getItem("clientId"));
  const token = JSON.parse(sessionStorage.getItem("token"));

  //Table column goes in here. This is to be passed as props/////////////////////////////
  const columns = [
    { field: "no", header: "S/N" },
    { field: "txnID", header: "TRANSACTION ID" },
    // { field: "action", header: "ACTION" },
    // { field: "account", header: "ACCOUNT" },
    { field: "amount", header: "AMOUNT" },
    { field: "date", header: "DATE" },
    { field: "status", header: "STATUS" },
  ];

  //APIs section starts here ////////////////////////////////////////////////////////////
  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://89.38.135.41:4457/v1/transactions/${clientId}?page=${currentPage}&startDate=${startDate}&endDate=${endDate}&limit=${postsPerPage}`,
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
      setTxnData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //APIs section ends here ////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log(moment(startDate).format(), moment(endDate).format());
  }, []);
  let myData = txnData?.data;
  const dataLength = txnData?.total;

  const endPage = Math.ceil(dataLength / postsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataLength / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const myPageNumbers = pageNumbers.slice(startPoint, endPoint);

  const prevPageHandler = () => {
    if (currentPage === 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
    if (currentPage <= startPoint + 1) {
      setStartPoint(startPoint - 5);
      setEndPoint(endPoint - 5);
    }
    setStartCount(startCount - 10);
    setEndCount(endCount - 10);
    setInit(init - 10);
  };
  const nextPageHandler = () => {
    if (currentPage >= endPage) {
      setIsLastPage(true);
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
    if (currentPage >= endPoint) {
      setStartPoint(startPoint + 5);
      setEndPoint(endPoint + 5);
    }

    setStartCount(startCount + 10);
    setEndCount(endCount + myData?.length);
    setInit(init + 10);
    num = num + 1;
  };

  useEffect(() => {
    if (txnData && dataLength < postsPerPage) {
      setEndCount(dataLength);
    }

    if (endPage > currentPage) {
      setEndCount(currentPage * 10);
    }
  }, [currentPage]);

  useEffect(() => {
    getTransactions();
    if (txnData && dataLength < postsPerPage) {
      setEndCount(dataLength);
    }
  }, [clientId, currentPage, dataLength, startDate, endDate]);

  return (
    <Container>
      {" "}
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
        <div className="table-head">
          <p className="recentCustomers">Deposit History</p>
          <div className="filterSection">
            <FilterContainer>
              <DatePickers>
                {/* <p>Start Date</p> */}
                <Range>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="myInput"
                  />
                  <img src={calendar} alt="" />
                </Range>
              </DatePickers>
              <DatePickers>
                {/* <p>End Date</p> */}
                <Range>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="myInput"
                  />
                  <img src={calendar} alt="" />
                </Range>
              </DatePickers>
              {/*  <Range style={{ width: "90px" }}>
                <img src={filter} alt="" />

                <select name="filter" id="filter">
                  <option value="">All</option>
                  <option value="">All</option>
                  <option value="">All</option>
                </select>
              </Range> */}
              <SearchWrapper>
                <img src={search} alt="" />
                <input type="text" placeholder="Search" />
                <p style={{ cursor: "pointer" }}>Go</p>
              </SearchWrapper>
            </FilterContainer>{" "}
            <button className="downloadBtn">
              <img src={cloud} alt="" /> Download
            </button>
          </div>
        </div>
        {loading ? (
          <div style={{ padding: "0 30px" }}>
            <Skeleton height={500} />
          </div>
        ) : (
          <>
            <TableWrapper>
              <ReusableTable
                type="deposit-history"
                columns={columns}
                init={init}
                data={txnData?.data}
              />
            </TableWrapper>
            <PaginationWrapper>
              <h5>
                Showing {startCount} to {endCount} of {dataLength} Entries
              </h5>
              <PaginationBtnWrapper>
                <button onClick={prevPageHandler}>Previous</button>
                {myPageNumbers.map((number) => (
                  <div key={number} className="numbers">
                    <p
                      href="#"
                      style={{
                        background: currentPage === number ? "#28D1FF" : "",
                        color: currentPage === number ? "#fff" : "",
                      }}
                      key={number}
                    >
                      {number}
                    </p>
                  </div>
                ))}
                <button onClick={nextPageHandler}>Next</button>
              </PaginationBtnWrapper>
            </PaginationWrapper>
          </>
        )}
      </div>
    </Container>
  );
};

export default History;

const Container = styled.div`
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

      img {
        width: 35px;
      }
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
          gap: 8px;
          color: #fff;
          /* align-items: center; */
        }
      }
    }
  }

  .contentWrapper {
    background-color: #fff;
    padding: 10px 0 80px;
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

    .table-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding-right: 10px;
      .filterSection {
        display: flex;
        align-items: center;
        gap: 10px;

        .downloadBtn {
          display: flex;
          align-items: center;
          height: 40px;
          width: 130px;
          background-color: #28d1ff;
          justify-content: center;
          gap: 8px;
          color: #fff;
          border: none;
          outline: none;
          font-weight: 500;
          border-radius: 4px;
          cursor: pointer;

          img {
            width: 20px;
            margin-bottom: 2px;
          }
        }
      }
      .recentCustomers {
        /* margin-top: 20px; */
        font-size: 20px;
        padding: 20px;
        em {
          font-size: 25px;
        }
      }
    }
  }
`;
const TableWrapper = styled.div`
  /* margin: 20px 0; */
`;
export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding: 0 20px;
  h5 {
    font-weight: 500;
  }
`;
export const PaginationBtnWrapper = styled.div`
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;

  button:not(.numbers a) {
    text-decoration: none;
    color: black;
    margin: 0 10px;
    font-size: 11px;
    font-weight: 600;
    font-family: "Karla", sans-serif;
    border: none;
    background: none;
    cursor: pointer;
    height: 100%;
  }

  .numbers {
    margin-bottom: 0px;

    p {
      cursor: default;
      color: black;
      text-decoration: none;
      border: 0.5px solid #d2d2d2;
      padding: 8px 12px;
      font-family: "Karla", sans-serif;
      font-size: 11px;
      font-weight: 600;
    }
  }
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Range = styled.div`
  display: flex;
  border: 1px solid #28d1ff;
  background-color: #fff;
  width: 150px;
  height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 6px;
  .myInput {
    height: 30px;
    width: 120px;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent;
  }
  img {
    width: 15px;
  }
  select {
    border: none;
    width: 50px;
    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const DatePickers = styled.div`
  p {
    font-size: 11px;
    margin-bottom: 2px;
    font-weight: 500;
    margin-left: 1px;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #28d1ff;
  height: 40px;
  border-radius: 6px;
  padding: 0 2px 0 10px;

  input {
    width: 220px;
    border: none;
    outline: none;
    height: 90%;
    margin-left: 9px;
  }
  p {
    background-color: #28d1ff;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
  }
`;
