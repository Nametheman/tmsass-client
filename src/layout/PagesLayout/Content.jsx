import React from "react";
import styled from "styled-components";

const Content = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Content;

const Container = styled.section``;
