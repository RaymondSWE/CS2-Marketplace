import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const Footer = (props) => {
  return (
    <footer>
      <div className="brand-and-copyright">
        <Link to="/" className="navbar-brand">
          {props.name}
        </Link>
        <div className="copyright">
          Copyright 2023 &copy; All Rights Reserved. Powered by Steam™, not
          affiliated with Valve Corp.
        </div>
      </div>

      <div className="right-side">
        <nav>
          <ul className="navbar-nav footer-content">
            <li className="nav-item mx-3">
              <Link
                data-toggle="modal"
                data-target="#contactUsModel"
                className="nav-link"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                data-toggle="modal"
                data-target="#faqModel"
                className="nav-link"
              >
                Frequently Asked Questions
              </Link>
            </li>
            <li className="nav-item mx-3">
              <Link
                data-toggle="modal"
                data-target="#termsCondition"
                className="nav-link"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </nav>
        <div className="payment-methods">
          <FaCcVisa size={32} />
          <FaCcMastercard size={32} />
          <FaCcAmex size={32} />
          <FaCcPaypal size={32} />
          <FaApplePay size={32} />
          <FaGooglePay size={32} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
