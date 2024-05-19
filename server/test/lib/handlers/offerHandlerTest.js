const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;

const { getOffer } = require("../../../lib/handlers/offerHandlers");
const config = require("../../../config/BotConfig");
const UsersItemsController = require("../../../controllers/UsersItemsController");
const Trade = require("../../../lib/index");

describe("offerHandlers", () => {
  describe("getOffer", () => {
    let socket;
    let fakeTrade;

    beforeEach(() => {
      // Set up the socket object with stubs for the 'on' and 'emit' methods
      socket = {
        on: sinon.stub().callsFake((event, callback) => {
          if (event === "get offer") {
            callback({
              tradelink: "VALID_TRADE_LINK",
              user: ["ASSET_ID_1", "ASSET_ID_2"],
              bot: [],
              listedPrice: 12.34,
            });
          }
        }),
        emit: sinon.stub(),
      };

      // Set up a fake Trade object with methods to be used in the tests
      fakeTrade = {
        validateOffer: sinon.stub(),
        getBot: sinon.stub(),
        botConfirmation: sinon.stub(),
      };

      // Set up a fake bot manager with methods to be used in the tests
      fakeBotManager = {
        createOffer: sinon.stub(),
      };

      // Set up a fake offer object with methods to be used in the tests
      fakeOffer = {
        addTheirItems: sinon.stub(),
        addMyItems: sinon.stub(),
        setMessage: sinon.stub(),
        getUserDetails: sinon.stub(),
        send: sinon.stub(),
      };

      // Set up the required stubs and mocks for the dependencies
      sinon.stub(UsersItemsController, "updateUsersItemsListedPrices");
      sinon.stub(Trade, "getBot").returns(fakeBotManager);
      sinon.stub(fakeBotManager, "manager").value(fakeBotManager);
      sinon.stub(fakeBotManager, "createOffer").returns(fakeOffer);
    });

    afterEach(() => {
      // Restore the stubs and mocks after each test
      UsersItemsController.updateUsersItemsListedPrices.restore();
      Trade.getBot.restore();
    });

    it("should validate and process a valid offer", () => {
      // Call the 'getOffer' function with the socket and fake Trade object
      getOffer(socket, fakeTrade);

      // Assertions go here
      expect(socket.emit.called).to.be.true;
      expect(UsersItemsController.updateUsersItemsListedPrices.called).to.be
        .true;
      expect(fakeTrade.validateOffer.called).to.be.true;
      expect(fakeTrade.getBot.called).to.be.true;
      expect(fakeOffer.send.called).to.be.true;
    });

    // Add more test cases as needed
  });
});
