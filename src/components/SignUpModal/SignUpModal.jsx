import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import TermsConditions from "../TermsConditions/TermsConditions";
import { toast } from "react-toastify";

const SignUpModal = ({ response }) => {
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState("");
  const addUserEmailURL =
    process.env.REACT_APP_API_URL ||
    `https://api.csfairtrade.com:4001/api/user/addUserEmail`;
  const steamid64 = response.id;

  const handleTermsClick = () => {
    setVerified(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter an email address");
    }
    if (!verified) {
      return toast.error("Please accept the terms and conditions");
    }

    try {
      const response = await fetch(addUserEmailURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          steamid64: steamid64,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message + "  refresh the page F5");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update email. Please try again later.");
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex="-1"
        aria-labelledby="signUpModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalLabel">
                Sign Up
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container text-white">
                <h6 className="gradientText text-center">
                  Please enter your email to complete CSFairTrade Account
                  Creation.
                </h6>

                <form className="my-4 w-100" onSubmit={handleSignUp}>
                  <div className="form-group">
                    <label className="gradientText d-block ml-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control w-100 my-2"
                      id="signUpEmail"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group checkBox-group my-2">
                    <input
                      type="checkbox"
                      id="terms&Condition"
                      onChange={() => setVerified(!verified)}
                    />
                    <label
                      htmlFor="terms&Condition"
                      className="d-block"
                      style={{ fontSize: "0.9rem" }}
                    >
                      I've read and accept the
                      <span
                        className="gradientText m-0 mx-1"
                        onClick={handleTermsClick}
                      >
                        Terms and conditions
                      </span>
                    </label>
                  </div>

                  <div className="form-group checkBox-group">
                    <input type="checkbox" id="bestPrice" />
                    <label
                      htmlFor="bestPrice"
                      className="d-block"
                      style={{ fontSize: "0.9rem" }}
                    >
                      I agree to receive email newsletters from
                      <span className="gradientText m-0 mx-1">CSFairTrade</span>
                    </label>
                  </div>
                  <div className="my-3">
                    <button
                      className="btn GradientBtn my-2 mr-2 my-sm-0 text-white btn-block"
                      type="submit"
                    >
                      <span>
                        <IoIosMail
                          className="mx-2 m-0"
                          style={{ fontSize: "1.25rem" }}
                        />
                      </span>
                      <span className="text-white GradientBtnWhite">
                        Continue
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsConditions onClick={handleTermsClick} />
    </>
  );
};

export default SignUpModal;
