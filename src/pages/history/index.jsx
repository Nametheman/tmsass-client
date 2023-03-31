import React from "react";
import { PagesLayout } from "../../layout";
import History from "./History";

const index = () => {
  return (
    <>
      <PagesLayout children={<History />} />
    </>
  );
};

export default index;
