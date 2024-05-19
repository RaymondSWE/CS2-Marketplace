export const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CARD":
      return {
        ...state,
        addCard: [...state.addCard, { ...action.payload, qty: 1 }],
      };
    case "REMOVE_FROM_CARD":
      return {
        ...state,
        addCard: state.addCard.filter(
          (c) => c.assetid !== action.payload.assetid,
        ),
      };
    case "ACTIONS_CALL_API": {
      console.log("ACTIONS_CALL_API");
      return {
        buyData: action.data,
        addCard: [],
      };
    }
    default:
      return state;
  }
};
