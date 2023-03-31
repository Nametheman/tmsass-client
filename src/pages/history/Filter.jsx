import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calendar from "../../assets/icons/calendar.svg";
import filter from "../../assets/icons/filter.svg";
import styled from "styled-components";
import search from "../../assets/icons/search.svg";

const Filter = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
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
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="myInput"
          />
          <img src={calendar} alt="" />
        </Range>
      </DatePickers>
      {/* <Range style={{ width: "90px" }}>
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
        <p>Go</p>
      </SearchWrapper>
    </FilterContainer>
  );
};

export default Filter;

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
