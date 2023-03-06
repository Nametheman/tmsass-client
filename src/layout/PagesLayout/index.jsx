import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import styled from "styled-components";

const index = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <Content children={children} />
    </Container>
  );
};

export default index;

const Container = styled.main`
  display: flex;
`;
