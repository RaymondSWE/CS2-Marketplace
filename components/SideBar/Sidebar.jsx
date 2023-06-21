import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Sidebar.css";
import {
  FaBars,
  FaSearch,
  FaUndoAlt,
  FaColumns,
  FaTimes,
  FaQuestionCircle,
} from "react-icons/fa";
import { Scrollbars } from "react-custom-scrollbars-2";
import BuyBody from "../BuyBody/BuyBody";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      opacity: 0,
    },
    show: {
      width: "100%",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
      opacity: 1,
    },
  };
  return (
    <>
      <div className="wrapper">
        <motion.nav id="sidebar" className={isOpen ? "active" : ""}>
          <div className="sidebar-header d-flex">
            <h3 className="sidebar-h3">Filter </h3>
            <button
              className="btn text-left pt-0 text-white shadow-none"
              onClick={toggle}
            >
              <FaTimes />
            </button>
          </div>

          <div id="siderContent">
            <Scrollbars className="customScrollBar">
              <ul className="list-unstyled components">
                <li className="active">
                  <a
                    href="#homeSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Price
                  </a>
                  <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li className="d-flex mx-2">
                      <input
                        type="password"
                        className="form-control mx-3"
                        id="from"
                        placeholder="From"
                      />
                      <input
                        type="text"
                        className="form-control mr-3"
                        id="to"
                        placeholder="To"
                      />
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="checkBox-group">
                    {/* <input type="checkbox" id="bestPrice" />
                    <label htmlFor="bestPrice">
                      Best Price On Global Market <FaQuestionCircle />
                    </label> */}
                  </div>
                </li>
                <li>
                  <a
                    href="#pageSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Trade Lock
                  </a>
                  <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="td-All" />
                        <label htmlFor="td-All">All</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="td-tradeLock" />
                        <label htmlFor="td-tradeLock">With Trade Lock</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="td-NoTradeLock" />
                        <label htmlFor="td-NoTradeLock">No Trade Lock</label>
                      </div>
                    </li>
                  </ul>
                </li>

                <li>
                  <a
                    href="#ExteriorSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Exterior
                  </a>
                  <ul className="collapse list-unstyled" id="ExteriorSubmenu">
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-All" />
                        <label htmlFor="ext-All">All</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-FactoryNew" />
                        <label htmlFor="ext-FactoryNew">Factory New</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-MininmalWear" />
                        <label htmlFor="ext-MininmalWear">Minimal Wear</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-FieldTested" />
                        <label htmlFor="ext-FieldTested">Field-Tested</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-WellWorn" />
                        <label htmlFor="ext-WellWorn">Well-Worn</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="ext-BattleScarred" />
                        <label htmlFor="ext-BattleScarred">
                          Battle-Scarred
                        </label>
                      </div>
                    </li>
                  </ul>
                </li>

                {/* <li>
                  <a
                    href="#UniqueItemsSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    Unique items
                  </a>
                  <ul
                    className="collapse list-unstyled"
                    id="UniqueItemsSubmenu"
                  >
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="uni-All" />
                        <label htmlFor="uni-All">All</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="uni-RarePhase" />
                        <label htmlFor="uni-RarePhase">Rare Phase</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="uni-RareFloat" />
                        <label htmlFor="uni-RareFloat">Rare Float</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="uni-RareItems" />
                        <label htmlFor="uni-RareItems">Rare Items</label>
                      </div>
                    </li>
                    <li>
                      <div className="checkBox-group">
                        <input type="checkbox" id="uniRareStickers" />
                        <label htmlFor="uniRareStickers">Rare Stickers</label>
                      </div>
                    </li>
                  </ul>
                </li> */}

                {/* <li>
                  <a href="#">
                    Phase <FaQuestionCircle />
                  </a>
                </li> */}
                {/* <li>
                  <a href="#">
                    Pattern <FaQuestionCircle />
                  </a>
                </li> */}
                {/* <li>
                  <a href="#">Stickers on items</a>
                </li> */}
                <li>
                  <a href="#">Items Category</a>
                </li>
                <li>
                  <a href="#">Float Value</a>
                </li>
                <li>
                  <a href="#">StatTrak</a>
                </li>
                {/* <li>
                  <a href="#">Souvenir</a>
                </li> */}
                <li>
                  <a href="#">Quality</a>
                </li>
                {/* <li>
                  <a href="#">Collection</a>
                </li>
                <li>
                  <a href="#">Family</a>
                </li> */}
              </ul>
            </Scrollbars>
          </div>
        </motion.nav>

        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <button
                type="button"
                id="sidebarCollapse"
                className="btn text-white shadow-none"
                onClick={toggle}
              >
                <span>
                  <FaBars />
                </span>
              </button>
              <div className="form-group has-search mb-0 mx-2">
                <span className="form-control-feedback">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control shadow-none"
                  placeholder={props.placeholder}
                />
              </div>
              <button
                type="button"
                id="sidebarCollapse"
                className="btn text-white shadow-none"
              >
                <span>
                  <FaUndoAlt />
                </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <div className="nav navbar-nav ml-auto">
                  <select
                    id="sortBy"
                    defaultValue={"DEFAULT"}
                    className="form-control shadow-none"
                  >
                    <option value="DEFAULT">Recommended For You</option>
                    <option>Lowest Price</option>
                    <option>Highest Price</option>
                  </select>
                </div>
                {/* <button
                  type="button"
                  id="sidebarCollapse"
                  className="btn text-white shadow-none"
                >
                  <span>
                    <FaColumns />
                  </span>
                </button> */}
              </div>
            </div>
          </nav>

          {props.mainBody}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
