import React from "react";
import moment from "moment";
import classes from "./Table.module.css";
// import nodata from "../../assets/images/no-data.gif";
import { Link } from "react-router-dom";

const ReusableTable = ({ data, columns, type, icon, init }) => {
  return (
    <>
      {type === "recent" && (
        <div>
          {/* {data?.length === 0 || data === null || data === undefined ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={nodata}
                alt=""
                style={{ height: "300px", opacity: "0.6" }}
              />{" "}
              <p style={{ margin: "0 !important", opacity: "0.3" }}>
                Nothing to show here!
              </p>
            </div>
          ) : ( */}
          <table className={classes.table}>
            <thead className={classes.tableHead}>
              <tr>
                {columns.map((column, index) => {
                  return (
                    <th key={index} className={classes.th}>
                      {column.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data?.map((datum, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      background: index % 2 === 0 ? "#fff" : "#FAFAFA",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {index + init}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.id}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.serviceName}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.billingId}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.amount}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.billing || 50}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.amount - 50}
                    </td>
                    <td
                      style={{
                        height: "40px",
                      }}
                    >
                      {datum?.createdAt}
                    </td>
                    <td
                      style={{
                        color: `${
                          data?.status === "SUCCESS"
                            ? "green"
                            : data.status === "FAILED"
                            ? "red"
                            : data.status === "PENDING"
                            ? "rgb(153, 150, 7)"
                            : ""
                        }`,
                        background: `${
                          data.status === "SUCCESS"
                            ? "rgba(25, 183, 41, 0.1"
                            : data.status === "FAILED"
                            ? "#FF0011"
                            : data.status === "PENDING"
                            ? "rgba(255, 173, 51, 0.1)"
                            : ""
                        }`,
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0.3em 1em",
                      }}
                    >
                      {datum?.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ReusableTable;
