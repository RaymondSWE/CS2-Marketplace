import React from "react";
import "./Banner.css";
import gungnir from "../../assets/csgo/gungnir.png";
import bluephosphor from "../../assets/csgo/bluephosphor_1.png";
import sapphire from "../../assets/csgo/sapphire.png";
import useUserSession from "../../hooks/useUserSession";
import { FaRss, FaSteamSquare, FaUndo, FaUsers } from "react-icons/fa";
import { BsDiscord } from "react-icons/bs";
import SkinPreview from "./SkinPreview";
import DiscountedSkinPreview from "./DiscountedSkinPreview";
import MostExpensiveSkinPreview from "./MostExpensiveSkinPreview";

const Banner = () => {
  const { totalUsers, isUserOnline } = useUserSession();

  return (
    <>
      <main role="main">
        <section className="welcome-section section-spacing ">
          <div className="detailContainer">
            <div className="text-center">
              <h4 className="text-white">
                {" "}
                <FaUndo className="primaryText mx-2" />{" "}
                <span className="gradientText">NaN</span>
              </h4>
              <h6 className="primaryText font-p75rem">TOTAL TRADES</h6>
            </div>
            <div className="text-center">
              <h4 className="text-white">
                {" "}
                <FaUsers className="primaryText mx-2" />{" "}
                <span className="gradientText">{totalUsers}</span>
              </h4>
              <h6 className="primaryText font-p75rem">TOTAL USERS</h6>
            </div>
            <div className="text-center">
              <h4 className="text-white">
                {" "}
                <FaRss className="primaryText mx-2" />{" "}
                <span className="gradientText">NaN</span>
              </h4>
              <h6 className="primaryText font-p75rem">USERS ONLINE</h6>
            </div>
          </div>
          <div className="jumbotron">
            <div className="container-fuild section-spacing">
              <div className="row">
                <div className="col-md-1"></div>

                <div className="my-auto col-md-5">
                  <h1 className="display-3 jumbotron-title">
                    Welcome to CSFAIRTRADE
                  </h1>
                  <div className="row">
                    <div className="col-md-8">
                      <p className="jumbotron-description gradientText">
                        Trade your skins like a pro with CSFairTrade - simple,
                        effortless transactions and low 4% fees for maximum
                        value. Join now!
                      </p>
                    </div>
                    <div className="col-md-8">
                      <button
                        className="btn navbarBtn homepageBtn my-2 mr-2 my-sm-0"
                        onClick={() =>
                          (window.location.href =
                            "http://139.59.179.67:4000/api/auth/steam")
                        }
                      >
                        <span>
                          <FaSteamSquare className="mx-2" />
                        </span>
                        <span className="text-white GradientBtnWhite">
                          Sign Up Through Steam
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="h-100 d-flex justify-content-center align-items-center">
                    <div className="hero-image-container">
                      <img
                        src={gungnir}
                        alt="Gungnir"
                        className="img-fluid weapon-img gungnir-img"
                      />
                      <img
                        src={sapphire}
                        alt="Sapphire"
                        className="img-fluid weapon-img sapphire-img"
                      />
                      <img
                        src={bluephosphor}
                        alt="Blue Phosphor"
                        className="img-fluid weapon-img bluephosphor-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="card-container section-spacing">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Secure Payment</h1>
            </div>
            <div className="card-body">
              <p className="card-text">
                We at CSFairTrade ensure that the payment information of our
                customers and their personal information is protected from fraud
                or unauthorized access.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Fast Online Support</h1>
            </div>
            <div className="card-body">
              <p className="card-text">
                The CSFairtrade team will be available in discord at all times,
                as well as through email.
                <a
                  href="https://discord.gg/Kk4UDSpCzx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <BsDiscord className="DiscordIcon" />
                </a>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Transparent</h1>
            </div>
            <div className="card-body">
              <p className="card-text">
                We are committed to providing our clients with complete
                transparency in all matters. Whenever there is an issue or
                problem, we will do our utmost to resolve it.{" "}
              </p>
            </div>
          </div>
        </section>
        <SkinPreview />
        <DiscountedSkinPreview />
        <MostExpensiveSkinPreview />
      </main>
    </>
  );
};

export default Banner;
