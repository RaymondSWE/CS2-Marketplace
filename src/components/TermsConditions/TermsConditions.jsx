import React from "react";
import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <>
      <div
        className="modal fade"
        id="termsCondition"
        tabIndex="-1"
        aria-labelledby="terms&ConditionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="terms&ConditionLabel">
                Terms & Conditions
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
                <div className="TermsConditonSection">
                  <header>
                    {/* <h2 className="tcs_head">Terms & Conditions</h2>  */}
                    <p className="gradientText">
                      In order to continue, you must read the Terms & Conditions
                      and Privacy.
                    </p>
                  </header>

                  <div className="tcs_body">
                    <p>
                      <span className="gradientText">1. </span>Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit. Ab officiis,
                      fuga vel doloribus possimus soluta. Consequuntur
                      reprehenderit voluptatum repellendus nemo error omnis
                      quasi, fuga sequi distinctio ipsa laudantium, neque
                      debitis.
                    </p>
                    <p>
                      <span className="gradientText">2. </span>Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit. Ab officiis,
                      fuga vel doloribus possimus soluta. Consequuntur
                      reprehenderit voluptatum repellendus nemo error omnis
                      quasi, fuga sequi distinctio ipsa laudantium, neque
                      debitis.
                    </p>
                    <p>
                      <span className="gradientText">3. </span>Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit. Ab officiis,
                      fuga vel doloribus possimus soluta. Consequuntur
                      reprehenderit voluptatum repellendus nemo error omnis
                      quasi, fuga sequi distinctio ipsa laudantium, neque
                      debitis.
                    </p>
                    <p>
                      <span className="gradientText">4. </span>Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit. Ab officiis,
                      fuga vel doloribus possimus soluta. Consequuntur
                      reprehenderit voluptatum repellendus nemo error omnis
                      quasi, fuga sequi distinctio ipsa laudantium, neque
                      debitis.
                    </p>
                    <p>
                      <span className="gradientText">5. </span>Lorem ipsum
                      dolor, sit amet consectetur adipisicing elit. Ab officiis,
                      fuga vel doloribus possimus soluta. Consequuntur
                      reprehenderit voluptatum repellendus nemo error omnis
                      quasi, fuga sequi distinctio ipsa laudantium, neque
                      debitis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;
