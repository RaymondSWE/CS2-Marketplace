import React from "react";
import "./Faq.css";
import { HiOutlineChevronDown } from "react-icons/hi";

const Faq = () => {
  return (
    <>
      <div
        className="modal fade"
        id="faqModel"
        tabIndex="-1"
        aria-labelledby="faqModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="faqModelLabel">
                Frequently Asked Questions
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
              <div className="">
                <div className="faq-section">
                  <header className="my-0 font-weight-bold">
                    <p>
                      Find the answers for the most frequently asked questions
                      below.
                    </p>
                  </header>

                  <details>
                    <summary>
                      <h4>What are the steps involved in purchasing?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      CSFairTrade does not require you to have anactive Steam
                      mobile authenticator. However, you will need to have an
                      active Steam Guard account via email in order to do so. To
                      purchase items, you will only be required to use your
                      balance on the "Buy" page. To increase your balance, you
                      will either need to fill your balance or sell an item{" "}
                    </p>
                  </details>
                  <hr />

                  <details>
                    <summary>
                      <h4>How can I buy on CSFairTrade?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      To purchase an item on CSFairTrade, make sure you've
                      logged into your account via Steam and your privacy
                      settings are public. Navigate to the "Add Steam Link" from
                      the navigation bar, by clicking your profile picture. This
                      is where you can find your trade link which is required
                      for both buying and selling. Choose the skins you're
                      interested in and add them to your cart. Then, proceed to
                      checkout, select your preferred payment method, and
                      finalize the purchase. Soon, you'll receive a trade offer
                      from our CSFairTrade Bots on Steam, which you need to
                      accept to complete your purchase.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>How can I sell on CSFairTrade?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      To sell your skins on CSFairTrade, first log in via your
                      Steam account and ensure your privacy settings and
                      inventory are set to public. Navigate to the "Add Steam
                      Link" from the navigation bar, by clicking your profile
                      picture. Here you can find your trade link which is
                      required for both buying and selling. From the navigation
                      bar, click on "Sell", then select the skins you wish to
                      sell. You can set your price or use our price suggestion.
                      After creating the offer, a trade offer from our
                      CSFairTrade Bots will be sent on Steam. Once you accept
                      it, your offer will be shown on the market and the sales
                      value will be credited to your CSFairTrade account when
                      someone buys your skin. Which can be withdrawn to bank
                      account.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>How do I adjust the price for my listed items?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      To change the price of your listed items, click on
                      "Withdraw Skins" from dropdown menu in navigation bar and
                      click change price.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>How can I cancel my offers?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      To cancel your offers, click on your profile picture in
                      the navigation bar and navigate to "Withdraw Skins".
                      Select the items you want to cancel using the checkboxes,
                      then click on "Withdraw Skin". Please note, items that are
                      still trade-locked cannot be returned to your account
                      until the 7-day trade-lock period by Valve has ended.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>Why am I not receiving a trade offer?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      If you're not receiving a trade offer, it could be due to
                      several reasons. You might have recently changed or
                      installed the Steam Authenticator, your tradelink set up
                      in your CSFairTrade profile might be invalid or expired,
                      or you may have a VAC-, trade-, or community-ban. In case
                      your inventory is full, you will need to clear space to
                      receive new items. For more information, try trading with
                      another person on Steam.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>What is the CSFairTrade 2-Factor-Authorization?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      The CSFairTrade 2-Factor-Authorization is a security
                      measure to protect you and your items from scams. This
                      service can be turned on and off in your personal profile
                      under "Account security". We recommend leaving it turned
                      on for your protection.
                    </p>
                  </details>
                  <hr />
                  <details>
                    <summary>
                      <h4>Why was my trade offer canceled?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Trade offers from our CSFairTrade bots are valid for 10
                      minutes. If the trade is not accepted within this time
                      frame, it gets cancelled. However, you can resend the
                      offer via your CSFairTrade profile. For purchases, click
                      on your avatar at the top right, go to your profile, press
                      "Withdraw Skins" in the navigation bar on the left and
                      find the "Withdraw" button for your trade.
                    </p>
                  </details>
                  <details>
                    <summary>
                      <h4>How do I deposit money to my CSFairTrade account?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      To deposit money into your CSFairTrade account, first
                      click your profile picture located at the top right of the
                      navigation bar. From the dropdown menu, click "My
                      Account". Select the desired deposit method and follow the
                      provided instructions.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>
                        Which payment methods are supported by CSFairTrade?
                      </h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      CSFairTrade supports various payment methods to provide
                      flexibility when depositing funds or making purchases. You
                      can make direct payments through SOFORT, bank transfer, or
                      Paysafecard, all of which can also be used for deposits.
                      Please note that standard bank transfers (IBAN SEPA or
                      SWIFT) are limited to deposits only.
                      <br />
                      To withdraw funds, you can use bank transfers (IBAN SEPA
                      or SWIFT). The minimum withdrawal amount is €5.00 for SEPA
                      bank transfers and €100 for SWIFT bank transfers.
                      Additional fees may be incurred depending on your chosen
                      payment method. For more information, check the "Fees"
                      section.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>How long does a withdrawal take?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      CSFairTrade strives to process and dispatch all
                      withdrawals within 24 hours. Nevertheless, withdrawals
                      through bank transfer (IBAN SEPA) may take between 2-4
                      working days before reflecting in your account. SWIFT
                      transactions usually take about 5-7 working days.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>Why do I have a payment and withdrawal limit?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      For the security of both buyers and sellers, we have set
                      daily limits on certain payment methods. If you find these
                      limits restricting, you have the option to increase your
                      trust level. Check the "Trust Level" section for more
                      details.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>
                        Can I refund money which I have already deposited to my
                        CSFairTrade account?
                      </h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Yes, you can refund your deposited money. To do this, you
                      can initiate a withdrawal of the deposited amount using
                      the same payment method you used to deposit. If your
                      deposit method doesn't support withdrawal, you can opt for
                      a bank transfer (IBAN).
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
