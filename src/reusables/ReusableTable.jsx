import React from "react";
import moment from "moment";
import classes from "./Table.module.css";
import nodata from "../../assets/images/no-data.gif";
import { Link } from "react-router-dom";
import { modalActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";

const ReusableTable = ({ data, columns, type, icon, init }) => {
  const dispatch = useDispatch();

  return (
    <>
      {type === "recent" && (
        <div>
          {data?.length === 0 || data === null || data === undefined ? (
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
          ) : (
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
                        background: index % 2 === 0 ? "#fff" : "#EEEFEF",
                        fontSize: "0.8rem",
                        fontWeight: "500",
                        textAlign: "center",
                      }}
                    >
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {index + init}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.first_name} {datum?.last_name}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.email}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.phone_no}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                        }}
                      >
                        {datum?.dob}
                      </td>
                      <td
                        style={{
                          borderRight: "1px solid #d7d7d780",
                          height: "40px",
                          textTransform: "capitalize",
                        }}
                      >
                        {" "}
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                          className={classes.recentReview}
                        >
                          {datum?.gender} <button>Review</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default ReusableTable;
