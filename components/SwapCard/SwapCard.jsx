import "./SwapCard.css";
import settingIcon from "../../assets/icon/setting.svg";
import ethereumIcon from "../../assets/icon/ethereum.svg";
import arrowDown from "../../assets/icon/arrow-down.svg";

const SwapCard = () => {
  return (
    <>
      <div className="row">
        <div className="my-5 mx-auto">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title text-white text-center">
                Fill Balance with CryptoCurrency
              </h4>
              <button type="button" className="settingIconBtn">
                <img src={settingIcon} alt="" />
              </button>
              <div className="inputBox">
                <div className="inputSwapTokenBox">
                  <div className="inputSwapToken">
                    <span className="inputSwapText">Amount</span>
                    <input
                      type="text"
                      className="form-control swapValue"
                      placeholder="0"
                    ></input>
                    <span className="inputSwapBalance">Balance: 70.42</span>
                  </div>
                  <div className="tokenBox">
                    <div className="changeTokenBox">
                      <div className="tokenImgBox">
                        <img src={ethereumIcon} className="tokenImg" alt="" />
                        <span className="tokenTxt">ETH</span>
                      </div>
                    </div>
                    <img src={arrowDown} className="arrowDown" alt="" />
                  </div>
                </div>
                {/* <div className="exchange">
                  {/* <img src={exchangeIcon} className="exchangeBtn" alt="" /> */}
              </div>

              <div className="amountBtnContainer">
                <button className="amountBtn">Enter an Amount</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwapCard;
