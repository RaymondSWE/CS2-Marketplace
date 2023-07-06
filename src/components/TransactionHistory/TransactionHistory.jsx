import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionHistory.css";

// Transaction data (replace this with API data in the future)
const transactions = [
  {
    id: 1,
    assetid: 12345,
    name: "AK-47 | Redline",
    price: 10,
    date: "2023-06-01",
  },
  {
    id: 2,
    assetid: 12346,
    name: "AWP | Asiimov",
    price: 15,
    date: "2023-06-02",
  },
  { id: 4, assetid: 12347, name: "M4A4 | Howl", price: 20, date: "2023-06-03" },
  {
    id: 5,
    assetid: 12348,
    name: "USP-S | Kill Confirmed",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 6,
    assetid: 12349,
    name: "Glock-18 | Fade",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 7,
    assetid: 12350,
    name: "Desert Eagle | Blaze",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 8,
    assetid: 12351,
    name: "M9 Bayonet | Doppler",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 9,
    assetid: 12352,
    name: "Karambit | Marble Fade",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 10,
    assetid: 12353,
    name: "Butterfly Knife | Slaughter",
    price: 20,
    date: "2023-06-03",
  },
  {
    id: 11,
    assetid: 12354,
    name: "P250 | Asiimov",
    price: 12,
    date: "2023-06-04",
  },
  {
    id: 12,
    assetid: 12355,
    name: "Five-SeveN | Hyper Beast",
    price: 18,
    date: "2023-06-05",
  },
  {
    id: 13,
    assetid: 12356,
    name: "SSG 08 | Blood in the Water",
    price: 22,
    date: "2023-06-06",
  },
  {
    id: 14,
    assetid: 12357,
    name: "AUG | Chameleon",
    price: 16,
    date: "2023-06-07",
  },
  {
    id: 15,
    assetid: 12358,
    name: "FAMAS | Roll Cage",
    price: 14,
    date: "2023-06-08",
  },
  {
    id: 16,
    assetid: 12359,
    name: "M4A1-S | Decimator",
    price: 24,
    date: "2023-06-09",
  },
  {
    id: 17,
    assetid: 12360,
    name: "G3SG1 | Flux",
    price: 17,
    date: "2023-06-10",
  },
  {
    id: 18,
    assetid: 12361,
    name: "UMP-45 | Grand Prix",
    price: 13,
    date: "2023-06-11",
  },
  {
    id: 19,
    assetid: 12362,
    name: "MAC-10 | Neon Rider",
    price: 19,
    date: "2023-06-12",
  },
  {
    id: 20,
    assetid: 12363,
    name: "Tec-9 | Fuel Injector",
    price: 21,
    date: "2023-06-13",
  },
  {
    id: 21,
    assetid: 12364,
    name: "P90 | Asiimov",
    price: 16,
    date: "2023-06-14",
  },
  {
    id: 22,
    assetid: 12365,
    name: "MP9 | Pandora's Box",
    price: 15,
    date: "2023-06-15",
  },
  {
    id: 23,
    assetid: 12366,
    name: "Galil AR | Rocket Pop",
    price: 14,
    date: "2023-06-16",
  },
  {
    id: 24,
    assetid: 12367,
    name: "SCAR-20 | Bloodsport",
    price: 26,
    date: "2023-06-17",
  },
  {
    id: 25,
    assetid: 12368,
    name: "M249 | Impact Drill",
    price: 23,
    date: "2023-06-18",
  },
  {
    id: 26,
    assetid: 12369,
    name: "Negev | Power Loader",
    price: 20,
    date: "2023-06-19",
  },
  {
    id: 27,
    assetid: 12370,
    name: "XM1014 | Bone Machine",
    price: 17,
    date: "2023-06-20",
  },
  {
    id: 28,
    assetid: 12371,
    name: "Sawed-Off | The Kraken",
    price: 18,
    date: "2023-06-21",
  },
  {
    id: 29,
    assetid: 12372,
    name: "Nova | Hyper Beast",
    price: 14,
    date: "2023-06-22",
  },
  {
    id: 30,
    assetid: 12373,
    name: "CZ75-Auto | Victoria",
    price: 13,
    date: "2023-06-23",
  },
];

const TransactionHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(5);

  useEffect(() => {
    // Here you can fetch data from the API when it is available
  }, []);

  // Logic for displaying transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(transactions.length / transactionsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    isModalOpen && (
      <div
        className="modal fade"
        id="TransactionHistoryModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="TransactionHistoryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="TransactionHistoryModalLabel">
                Transaction History
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
              <table className="table-transactionhistory">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Asset ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.id}</td>
                      <td>{transaction.assetid}</td>
                      <td>{transaction.name}</td>
                      <td>{transaction.price}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination ">
                {pageNumbers.map((number) => (
                  <button
                    onClick={() => paginate(number)}
                    key={number}
                    className="page-link"
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn Darkbtn shadow px-4 my-2 mr-2 my-sm-0"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TransactionHistory;
