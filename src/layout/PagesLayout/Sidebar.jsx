import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/tmsss.svg";
import { ReactComponent as dashboardImg } from "../../assets/icons/dashboard.svg";
import { ReactComponent as transactionsImg } from "../../assets/icons/transaction.svg";
import { ReactComponent as accountImg } from "../../assets/icons/account.svg";
import { ReactComponent as servicesImg } from "../../assets/icons/services.svg";
import { ReactComponent as MarketplaceImg } from "../../assets/icons/marketplace.svg";
import logoutImg from "../../assets/icons/logout.svg";
import { RxDashboard } from "react-icons/rx";
import { CgNotes } from "react-icons/cg";
import { HiOutlineUsers, HiOutlineBuildingStorefront } from "react-icons/hi2";
import { BsBriefcase } from "react-icons/bs";
import { BiStore } from "react-icons/bi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const myPath = location.pathname;
  const currPath = JSON.parse(sessionStorage.getItem("currPath"));
  const [clikedLink, setClickedLink] = useState("");
  console.log(currPath, clikedLink);
  const sideBarLinks = [
    { name: "Dashboard", logo: RxDashboard, path: "/dashboard", id: "link1" },
    {
      name: "Transactions",
      logo: CgNotes,
      path: "/transactions",
      id: "link2",
    },
    { name: "Account", logo: HiOutlineUsers, path: "/account", id: "link3" },
    {
      name: "Services",
      logo: HiOutlineBuildingStorefront,
      path: "/services",
      id: "link4",
    },
    {
      name: "Bulk Services",
      logo: BsBriefcase,
      path: "/bulk-services",
      id: "link5",
    },
    // {
    //   name: "Market Place",
    //   logo: marketplaceImg,
    //   path: "/market-place",
    //   id: "link6",
    // },
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
              <link.logo size={20} className="nav-svg" />
              {link.name}
            </SideLink>
          );
        })}
        <Marketplace
          href="https://saas.tm30.net/marketplace********Bzl"
          target="_blank"
        >
          {" "}
          <BiStore size={20} />
          Market place
        </Marketplace>
      </div>

      <div className="logout">
        <hr />
        <div
          className="logoutBtn"
          onClick={() => {
            navigate("/login");
            sessionStorage.clear("token");
          }}
        >
          <img src={logoutImg} alt="" />
          <p>Logout</p>
        </div>
      </div>
    </Container>
  );
};

export default Sidebar;
const Container = styled.div`
  width: 250px;
  /* max-height: 900px; */
  position: fixed;
  z-index: 10;
  /* left: 0; */
  min-height: 100vh;
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

    img {
      width: 140px;
    }
  }

  .linksSection {
    padding: 0 20px;
    margin-top: 50px;
  }

  .logout {
    margin-top: 80px;

    hr {
      border: 0.2px solid #94949438;
    }
    .logoutBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      gap: 18px;
      cursor: pointer;
      p {
        font-size: 13px;
      }
      img {
        width: 17px;
      }
    }
  }
`;

const SideLink = styled(NavLink)`
  display: flex;
  /* width: 270px; */
  margin: 0 auto;
  align-items: center;
  padding: 8px 10px;
  gap: 10px;
  margin-bottom: 16px;
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
    cursor: pointer;
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
`;

const Marketplace = styled.a`
  display: flex;
  /* width: 270px; */
  margin: 0 auto;
  align-items: center;
  padding: 8px 10px;
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
    cursor: pointer;
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
`;
