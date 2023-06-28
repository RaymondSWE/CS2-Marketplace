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
                    <p className="gradientText">
                      In order to continue, you must read the Terms & Conditions
                      and Privacy.
                    </p>
                  </header>

                  <div className="tcs_body">
                  <p>
                      <span className="gradientText">1. </span>Welcome to CSFairTrade, the CS:GO skin marketplace. By using our services, you agree to comply with these Terms of Use. Please review them carefully.
                    </p>
                    <p>
                      <span className="gradientText">2. </span>CSFairTrade acts as an intermediary for the transfer of virtual items (skins) among users in CS:GO.
                    </p>
                    <p>
                      <span className="gradientText">3. </span>CSFairTrade is not affiliated with Valve Corp. or its affiliates. All virtual items remain the intellectual property of Valve Corp.
                    </p>
                    <p>
                      <span className="gradientText">4. </span>By creating a CSFairTrade account and using our service, you agree to abide by these Terms of Use and our Refund Policy.
                    </p>
                    <p>
                      <span className="gradientText">5. </span>You must be of legal age or obtain parental or legal guardian approval to enter into this Agreement.
                    </p>
                    <p>
                      <span className="gradientText">6. </span>Your privacy is important to us. Please read our Privacy Policy and Cookie Policy to understand how we collect, use, and share your personal data.
                    </p>
                    <p>
                      <span className="gradientText">7. </span>To use our service, you must register a CSFairTrade account and accept our Terms of Use and Refund Policy. You are responsible for managing and protecting your account and complying with applicable laws and regulations.
                    </p>
                    <p>
                      <span className="gradientText">8. </span>We may block or delete your account for reasons stated in our AML and KYC Policy. In case of disputes or chargebacks, we may block your account for 180 days.
                    </p>
                    <p>
                      <span className="gradientText">9. </span>CSFairTrade provides a platform for users to trade virtual items (skins) in the CS:GO game. All trades are conducted through the Steam platform, with CSFairTrade acting as an intermediary.
                    </p>
                    <p>
                      <span className="gradientText">10. </span>Our service includes different modes, such as Trade Mode, Sell Mode, Auction, and Market Mode. Each mode has its own rules and requirements.
                    </p>
                    <p>
                      <span className="gradientText">11. </span>By using our service, you confirm that you possess the necessary knowledge and understanding of virtual items, including their risks and associated restrictions. You accept full responsibility for your decisions, and all skin transfers are considered final.
                    </p>
                    <p>
                      <span className="gradientText">12. </span>We strongly recommend using our Antiscam extension to protect your Steam account from scammers.
                    </p>
                    <p>
                      <span className="gradientText">13. </span>CSFairTrade Balance and Market Balance are in-platform currencies used for transactions within our service. They have specific terms and limitations, and the withdrawal process requires KYC verification.
                    </p>
                    <p>
                      <span className="gradientText">14. </span>We reserve the right to establish limits, prices, and terms for trades, sales, and auctions to ensure fairness and prevent monopolization.
                    </p>
                    <p>
                      <span className="gradientText">15. </span>You are solely responsible for fulfilling your tax obligations regarding any money or profit received through our Platform.
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
