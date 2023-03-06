import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/tmsss.svg";
import { ReactComponent as dashboardImg } from "../../assets/icons/dashboard.svg";
import { ReactComponent as transactionsImg } from "../../assets/icons/transaction.svg";
import { ReactComponent as accountImg } from "../../assets/icons/account.svg";
import { ReactComponent as servicesImg } from "../../assets/icons/services.svg";
import { ReactComponent as marketplaceImg } from "../../assets/icons/marketplace.svg";

const Sidebar = () => {
  const location = useLocation();
  const myPath = location.pathname;
  const currPath = JSON.parse(sessionStorage.getItem("currPath"));
  const [clikedLink, setClickedLink] = useState("");
  console.log(currPath, clikedLink);
  const sideBarLinks = [
    { name: "Dashboard", logo: dashboardImg, path: "/dashboard", id: "link1" },
    {
      name: "Transactions",
      logo: transactionsImg,
      path: "/transactions",
      id: "link2",
    },
    { name: "Account", logo: accountImg, path: "/account", id: "link3" },
    {
      name: "Services",
      logo: servicesImg,
      path: "/services",
      id: "link4",
    },
    {
      name: "Market Place",
      logo: marketplaceImg,
      path: "/market-place",
      id: "link5",
    },
  ];
  let activeStyle = {
    backgroundColor: "#ff993a",
    border: " 1px solid",
    color: "#fff",
    borderRadius: "8px",
  };

  const LinksWrapper = styled.nav`
    margin-top: ${myPath === "/home" ? "20px" : "70px"};
  `;
  return (
    <Container>
      <div className="logoSection">
        <img src={logo} alt="" />
      </div>

      <div className="linksSection">
        {sideBarLinks.map((link, idx) => {
          return (
            <SideLink
              to={link.path}
              key={link.id}
              onClick={() => {
                setClickedLink(link.path);
                sessionStorage.setItem("currPath", JSON.stringify(link.path));
              }}
              // className={`${currPath !== clikedLink ? "active" : ""}`}
            >
              <link.logo className="nav-svg" />
              {link.name}
            </SideLink>
          );
        })}
      </div>
    </Container>
  );
};

export default Sidebar;
const Container = styled.div`
  width: 250px;
  min-height: 100vh;
  height: 100vh;
  position: fixed;
  /* padding: 15px 0; */
  background-color: #fff;

  @media only screen and (max-width: 450px) {
    display: none;
  }

  .logoSection {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.3em;
    gap: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #8791a34d;
  }

  .linksSection {
    padding: 0 20px;
    margin-top: 50px;
  }
`;

const SideLink = styled(NavLink)`
  display: flex;
  /* width: 270px; */
  margin: 0 auto;
  align-items: center;
  padding: 14px 15px;
  gap: 10px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  color: #8791a3;
  font-size: 11px;
  font-weight: 600;
  border: none;
  outline: none;

  &:hover {
    background-color: #28d1ff;
    border: 1px solid;
    color: #fff;
    border-radius: 8px;
    .nav-svg {
      fill: #fff;
      stroke: #fff;
      stroke-width: 0.1px;
    }
  }

  &.active {
    border: 1px solid;
    color: #fff;
    border-radius: 8px;
    background-color: #28d1ff;
    .nav-svg {
      fill: #fff;
      stroke: #fff;
      stroke-width: 0.1px;
    }
  }

  /* &:hover,
  &:focus,
  &:active {
    color: #fff;
    background-color: #28d1ff;
    .nav-svg {
      filter: #fff;
    }
  } */
`;
