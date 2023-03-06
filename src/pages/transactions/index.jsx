import React from "react";
import { PagesLayout } from "../../layout";
import Home from "./Home";

const index = () => {
  return (
    <>
      <PagesLayout children={<Home />} />
    </>
  );
};

export default index;
