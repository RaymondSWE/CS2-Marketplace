import React, { useState, useEffect } from "react";
import "./Navbar.css";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import GradientBtn from "../GradientButton/GradientBtn";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import steamLoginImg from "../../assets/icon/steam_signin_large.png";
import axios from "axios";
import PaymentMethod from "../StripCard/PaymentMethod";
import Deposit from "../Deposit/Deposit";
import SteamAccount from "../SteamAccount/SteamAccount";
import SignUpModal from "../SignUpModal/SignUpModal";
import WithdrawSkinsModal from "../WithdrawSkinsModal/WithdrawSkinsModal";
import CustomAlert from "../CustomAlert/CustomAlert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserSession from "../../hooks/useUserSession";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [response, setResponse] = useState({});
  const [openDeposit, setOpenDeposit] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false); // state for showing/hiding the withdraw modal

  const logoutUrl = `https://api.csfairtrade.com:4001/api/auth/logout`;
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const { userId, balance, email, tradeLink } = useUserSession();

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    axios
      .get("https://api.csfairtrade.com:4001/api/auth/user", {
        withCredentials: true,
      })
      .then((res) => {
        setResponse(res.data);
        if (!res.data.email) {
          axios
            .get(
              `https://api.csfairtrade.com:4001/api/user/getUserEmailWithNull/${res.data.id}`
            )
            .then((res) => {
              if (res.data.users.length) {
                setShowSignUpModal(true);
              }
            });
        }
      });
  }

  const handleOpenDeposit = () => {
    setOpenDeposit(true);
  };

  const handleCloseDeposit = () => {
    setOpenDeposit(false);
  };

  const handleOpenWithdraw = () => {
    setShowWithdrawModal(true); // function to open the withdraw modal
  };

  const handleCloseWithdraw = () => {
    setShowWithdrawModal(false); // function to close the withdraw modal
  };

  function handleLogout() {
    axios.get(logoutUrl).then((res) => {
      toast.success("Logout Success!", {
        theme: "colored",
      });
      setResponse({});
      setShowSignUpModal(false);
    });
  }

  function showSignUp() {
    window.location.href = "https://api.csfairtrade.com:4001/api/auth/steam";
  }

  function UserAccount() {
    return (
      <div className="d-flex">
        <GradientBtn text={`${balance} $`} />
        <button
          variant="outlined"
          className="btn fill-balance user-detail-container login-user-name mr-2"
          onClick={handleOpenDeposit}
        >
          <span className="gradientText depositNavbarBtn">Fill balance</span>
        </button>
        <div className="login-container">
          <div className="user-detail-container">
            <span className="login-user-name ml-3 mt-0">
              {response.displayName}
            </span>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={response._json.avatar}
                    width="30"
                    height="30"
                    className="login-user-img mr-2"
                    alt=""
                  />
                </Link>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target={
                      showSignUpModal
                        ? "#signUpModal"
                        : "#TransactionHistoryModal"
                    }
                  >
                    {showSignUpModal ? "Add Email" : "Transactions History"}
                  </Link>
                  <Link
                    className="dropdown-item"
                    data-toggle="modal"
                    data-target="#steamAccount"
                  >
                    Steam Trade Link
                  </Link>
                  <Link
                    className="dropdown-item"
                    onClick={handleOpenWithdraw} // open withdraw modal when clicked
                  >
                    Withdraw Skins
                  </Link>
                  <Link className="dropdown-item" onClick={handleLogout} to="">
                    Sign Out
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <div className="logout"></div>
        </div>
      </div>
    );
  }

  function AnonymousUser() {
    return (
      <a
        href="https://api.csfairtrade.com:4001/api/auth/steam"
        style={{ background: "transparent" }}
      >
        <img alt="Login" src={steamLoginImg} />
      </a>
    );
  }

  return (
    <>
      <ToastContainer />
      {showSignUpModal && (
        <SignUpModal
          show={showSignUpModal}
          setShow={setShowSignUpModal}
          response={response} // Pass the response data as props
        />
      )}
      {response ? (
        <SteamAccount response={response} />
      ) : (
        <div>Please log in to view your Steam account</div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark mt-3 px-4 mb-4">
        <Link to="/" className="navbar-brand">
          CSFairTrade
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mx-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <CustomLink to="/">Home</CustomLink>
            <CustomLink to="/buy">Buy</CustomLink>
            <CustomLink to="/sell">Sell</CustomLink>
            <CustomLink to="/exchange">Exchange</CustomLink>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            <div>
              {Object.keys(response).length > 0 ? (
                response.hasOwnProperty("error") ? (
                  <a href="https://api.csfairtrade.com:4001/api/auth/steam">
                    <img alt="Login" src={steamLoginImg} />
                  </a>
                ) : (
                  <UserAccount />
                )
              ) : (
                <AnonymousUser />
              )}
            </div>
          </div>
        </div>
      </nav>
      {openDeposit && (
        <Deposit
          showModal={openDeposit}
          handleCloseDeposit={handleCloseDeposit}
        />
      )}
      <TransactionHistory />
      {/* Add the WithdrawSkinsModal here*/}
      {showWithdrawModal && (
        <WithdrawSkinsModal
          showModal={showWithdrawModal}
          handleCloseWithdraw={handleCloseWithdraw}
        />
      )}
    </>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname });
  return (
    <li className={isActive ? "nav-item active" : "nav-item"}>
      <Link to={to} className="nav-link">
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
