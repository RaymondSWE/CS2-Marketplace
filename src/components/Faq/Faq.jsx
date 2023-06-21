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
                      CSFairTrade does not require you to have an
                      <strong>
                        <u>active Steam mobile authenticator.</u>
                      </strong>
                      However, you will need to have an active Steam Guard
                      account via email in order to do so. To purchase items,
                      you will only be required to use your balance on the
                      purchasing/buying page. To increase your balance, you will
                      either need to fill your balance or sell an item.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>What are the steps involved in purchasing?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos, magnam. Facilis, nihil. Nihil odio, unde
                      aspernatur nostrum, rem omnis repellendus vero ab
                      doloremque, blanditiis voluptatibus dolorum quidem eius
                      illo impedit..
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>What are the steps involved in purchasing?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Soluta voluptatem est unde quaerat corporis nostrum,
                      maxime distinctio hic laboriosam similique illum pariatur
                      repellendus possimus, adipisci veniam repellat, placeat
                      natus delectus.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>What are the steps involved in purchasing?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda soluta voluptatum omnis sit. Dignissimos,
                      eveniet fugiat. Voluptate eius pariatur sed numquam nemo
                      impedit molestias iure architecto adipisci totam, aut
                      quasi!.
                    </p>
                  </details>

                  <hr />

                  <details>
                    <summary>
                      <h4>What are the steps involved in purchasing?</h4>
                      <HiOutlineChevronDown />
                    </summary>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nostrum perspiciatis unde architecto amet placeat
                      accusamus facere nesciunt non, cupiditate odit porro nemo
                      mollitia quis. Exercitationem sapiente dolorem sint
                      delectus veritatis.
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
