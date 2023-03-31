import React, { useState, useEffect } from "react";
import styled from "styled-components";
import alarmSvg from "../../assets/images/alarm.svg";
import userAvi from "../../assets/images/dummyAvi.svg";
import { RxCaretDown } from "react-icons/rx";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import { ImBin } from "react-icons/im";
import addIcon from "../../assets/icons/add.svg";
import caretDown from "../../assets/icons/caret_down.svg";
import produce from "immer";
import importDoc from "../../assets/images/importDoc.svg";
import Papa from "papaparse";
import bulkTemplate from "../../assets/template/bulk_airtime_sample.csv";
import { bulkvend } from "../../components/Table";
import { Table } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const clientId = JSON.parse(sessionStorage.getItem("clientId"));

  const [messageArray, setMessageArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [variant, setVariantList] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const tableCsvData = csvData.slice(1);
  const tableHead = [
    { field: "no", header: "S/N" },
    { field: "number", header: "Phone Number" },
    { field: "network", header: "Network" },
    { field: "amount", header: "Amount" },
  ];
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvText = event.target.result;
      const parsedData = Papa.parse(csvText).data;
      setCsvData(parsedData);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    console.log(csvData, csvData.slice(1));
  }, [csvData]);

  const handleSendall = (e) => {
    setLoading(true);
    const refactoredArray = csvData?.slice(1)?.map((item) => {
      const fecther = async () => {
        const response = await fetch(`${process.env.REACT_APP_PS_URL}airtime`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "client-id": `${clientId}`,
          },
          body: JSON.stringify({
            phoneNumber: item[0],
            network: item[1],
            amount: item[2],
            provider: "creditswitch",
          }),
        });
        const data = await response.json();
        setLoading(false);
        if (data?.error) {
          setMessageArray((current) => [...current, data?.data?.status]);
        } else {
          setMessageArray((current) => [...current, data?.data?.status]);
          console.log(messageArray, "message");
          setCsvData([]);

          setTimeout(() => {
            setMessageArray([]);
          }, 2000);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      };
      fecther();
    });
  };
  const handleSendall2 = () => {
    setLoading(true);

    vendList?.forEach(async (item) => {
      const response = await fetch(`${process.env.REACT_APP_PS_URL}airtime`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "client-id": `${clientId}`,
        },
        body: JSON.stringify(item),
      });
      const data = await response.json();
      setLoading(false);
      if (data?.error) {
        setMessageArray((current) => [...current, data?.data?.status]);
      } else {
        setMessageArray((current) => [...current, data?.data?.status]);
        console.log(messageArray, "message");
        setVendList([
          ...variant,
          {
            phoneNumber: "",
            network: "Select Network",
            amount: "",
            provider: "creditswitch",
          },
        ]);
        setTimeout(() => {
          setMessageArray([]);
        }, 2000);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }

      console.log(data?.error?.message);
    });
  };

  const [vendList, setVendList] = useState([
    { phoneNumber: "", network: "", amount: "", provider: "creditSwitch" },
  ]);

  const addVendListHandler = () => {
    if (vendList.length < 4) {
      setVendList([
        ...vendList,
        {
          phoneNumber: "",
          network: ["MTN", "GLO", "9 MOBILE", "AIRTEL"],
          amount: "",
        },
      ]);
      console.log(vendList);
    } else {
      return;
    }
  };
  const removeVendListHandler = (idx) => {
    const list = [...vendList];
    list.splice(idx, 1);
    setVendList(list);
  };
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
        <p className="recentCustomers">Bulk Services</p>

        <div className="vending">
          {vendList.map((vend, idx) => {
            return (
              <div className="vendPack">
                <div className="inputs">
                  <div className="label">Phone Number</div>
                  <input
                    value={vend?.phoneNumber}
                    type="number"
                    placeholder="Enter recipient phone number"
                    onChange={(e) => {
                      const phoneNumber = e.target.value;
                      setVendList((currentVariant) =>
                        produce(currentVariant, (v) => {
                          v[idx].phoneNumber = phoneNumber;
                        })
                      );
                    }}
                  />
                </div>
                &nbsp; &nbsp;
                <div className="inputs">
                  <div className="label">Network</div>

                  <select
                    onChange={(e) => {
                      const network = e.target.value;
                      setVendList((currentVariant) =>
                        produce(currentVariant, (v) => {
                          v[idx].network = network;
                        })
                      );
                    }}
                    name=""
                    id=""
                  >
                    {[
                      "Choose network provider",
                      "AIRTEL",
                      "GLO",
                      "MTN",
                      "9MOBILE",
                    ].map((x, index) => {
                      return (
                        <option
                          disabled={index === 0}
                          selected={index === 0}
                          value={x}
                        >
                          {x}
                        </option>
                      );
                    })}
                  </select>
                </div>
                &nbsp; &nbsp;
                <div className="inputs">
                  <div className="label">Amount</div>
                  <input
                    value={vend?.amount}
                    type="number"
                    placeholder="Enter amount to vend"
                    onChange={(e) => {
                      const amount = e.target.value;
                      setVendList((currentVariant) =>
                        produce(currentVariant, (v) => {
                          v[idx].amount = amount;
                        })
                      );
                    }}
                  />
                </div>
                &nbsp; &nbsp;
                {(idx === 0 && vendList?.length !== 5 && (
                  <button className="addbtn" onClick={addVendListHandler}>
                    <MdOutlineAdd size={24} />
                  </button>
                )) ||
                  (idx !== 0 && (
                    <button
                      className="removeBtn"
                      onClick={() => removeVendListHandler(idx)}
                    >
                      <ImBin size={20} />
                    </button>
                  )) || <button disabled>Add</button>}
              </div>
            );
          })}
        </div>
        {(messageArray?.length && (
          <div>
            <span style={{ color: "green" }}>
              {messageArray?.filter((x) => x === "SUCCESS")?.length} -
              Successful
            </span>
            &nbsp; &nbsp;
            <span style={{ color: "red" }}>
              {messageArray?.length -
                messageArray?.filter((x) => x === "SUCCESS")?.length}{" "}
              - Failed
            </span>
          </div>
        )) ||
          ""}
        <div className="vendAction">
          <button onClick={() => handleSendall2()}>Vend Airtime</button>
        </div>

        <br />
        <br />
        <br />
        <div className="importDocSection">
          <img src={importDoc} alt="" />
          <label htmlFor="uploadbtn">hi</label>

          <input
            type="file"
            id="uploadbtn"
            onChange={(e) => handleFileUpload(e)}
            style={{
              display: "none",
            }}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </div>
        <p className="templateDwnld">
          Click{" "}
          <a href={bulkTemplate} download>
            here
          </a>{" "}
          to download sample template
        </p>
        <br />

        {csvData.length >= 1 ? (
          <div className="vendTable">
            <Table
              style={{ display: "block", width: "100%" }}
              className="table"
              columns={bulkvend}
              dataSource={[
                ...csvData?.slice(1).map((item) => {
                  return {
                    phoneNumber: item[0],
                    network: item[1],
                    amount: item[2],
                  };
                }),
              ]}
            />
          </div>
        ) : (
          ""
        )}
        <div className="vendAction">
          <button
            onClick={() => handleSendall()}
            disabled={csvData?.length >= 1 ? false : true}
          >
            Vend Airtime
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Home;

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

    .recentCustomers {
      /* margin-top: 20px; */
      font-size: 30px;
      padding: 20px;
    }

    .vending {
      padding: 0 30px 0 60px;
      .vendPack {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;

        .inputs {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          width: 100%;

          .label {
            font-size: 13px;
            font-weight: 600;
          }

          input,
          select {
            border: 1px solid #28d1ff;
            width: 90%;
            height: 45px;
            padding: 0 15px;
            border-radius: 5px;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;

            &:active,
            &:focus {
              outline: none;
            }
            @media only screen and (max-width: 1280px) {
              width: 260px;
            }
          }

          .network {
            border: 1px solid #28d1ff;
            width: 90%;
            height: 45px;
            padding: 0 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            p {
              font-size: 14px;
            }
          }
        }
        .addbtn {
          margin-top: 28px;
          background-color: #28d1ff;
          width: 16%;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          color: #fff;
          font-weight: 600;
          font-size: 17px;
          border-radius: 5px;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .removeBtn {
          margin-top: 22px;
          border: none;
          outline: none;
          background-color: tomato;
          width: 16%;
          height: 45px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 5px;
          color: #fff;
          font-weight: 600;
          font-size: 17px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }
    .vendAction {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      button {
        background-color: #28d1ff;
        border: none;
        outline: none;
        width: 400px;
        height: 40px;
        font-size: 15px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;

        &:disabled {
          background-color: #3d3d3d;
          color: #acacac;
          cursor: not-allowed;
        }
      }
    }

    .vendTable {
      padding: 0 100px;
      width: 100%;

      .table {
        border-collapse: collapse;
        width: 100%;
        thead {
          text-align: center;
          background-color: #28d1ff;
          color: #fff;
        }

        tbody {
          background-color: #28d0ff15;

          tr {
            td {
              text-align: center;
              font-size: 13px;
              font-weight: 500;
              padding: 20px 0;
            }
          }
        }
      }
    }

    .templateDwnld {
      margin: 10px 100px;
      font-size: 14px;

      a {
        color: #28d1ff;
        cursor: pointer;
        text-decoration: none;
      }
    }
    .importDocSection {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px dashed #28d1ff;
      border-radius: 10px;
      margin: 0 100px;
      padding: 30px 0;
      position: relative;

      img {
        cursor: pointer;
      }
      label {
        position: absolute;
        width: 100px;
        height: 100px;
        opacity: 0;
      }
    }
  }
`;
