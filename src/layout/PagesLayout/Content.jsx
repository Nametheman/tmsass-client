import React from "react";
import styled from "styled-components";
import contentHd from "../../assets/images/contentHead.svg";

const Content = ({ children }) => {
  return (
    <Container>
      <div className="frameComtainer"></div>

      {children}
    </Container>
  );
};

export default Content;

const Container = styled.section`
  width: calc(100vw - 250px);
  min-height: 100vh;
  overflow-y: scroll;
  background-color: #f4f3f3;
  position: absolute;
  right: 0;

  .frameComtainer {
    background: linear-gradient(rgba(56, 182, 255, 0.35), rgba(0, 9, 13, 0.65)),
      url(${contentHd}), no-repeat, center;
    width: 100%;
    height: 250px;
    img {
      object-fit: cover;
      width: 100vw;
      height: 240px;
    }
  }
  .children {
  }
`;
