import React, { useState, useEffect } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <>
      <div
        className="modal fade"
        id="contactUsModel"
        tabIndex="-1"
        aria-labelledby="contactUsModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactUsModelLabel">
                Contact Us
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
              <div className="contactUs-section">
                <header className="my-0 font-weight-bold">
                  <p>If you have any questions, feel free to reach us below.</p>
                </header>

                <form>
                  <div className="form-group">
                    <label className="gradientText" htmlFor="inputEmail">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label className="gradientText" htmlFor="contactUsMessage">
                      Your message
                    </label>
                    <textarea
                      className="form-control"
                      id="contactUsMessage"
                      rows="3"
                      placeholder="Enter your message here..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary GradientBtn contactUsBtn"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
