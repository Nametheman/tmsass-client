import React from "react";
import { PagesLayout } from "../../layout";
import Home from "./Home";
import styled from "styled-components";

const index = () => {
  return (
    <>
      <PagesLayout children={<Home />} />
    </>
  );
};

export default index;
const Container = styled.div``;
