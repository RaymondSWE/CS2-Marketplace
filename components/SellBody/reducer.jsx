export const cardReducer = (state, action) => {
  switch (action.type) {
    // Add an item to the card
    case "ADD_TO_CARD":
      return {
        ...state,
        addCard: [...state.addCard, { ...action.payload, qty: 1 }],
      };

    // Remove one item with a specific classid from the card
    case "REMOVE_FROM_CARD":
      let removed = false; // Keep track of whether an item has been removed
      return {
        ...state,
        addCard: state.addCard.filter((c) => {
          // If the item hasn't been removed and its classid matches the payload's classid
          if (!removed && c.assetid === action.payload.assetid) {
            removed = true; // Mark the item as removed
            return false; // Exclude the item from the new array
          }
          return true; // Include other items in the new array
        }),
      };

    // Handle API call actions
    case "ACTIONS_CALL_API":
      // console.log("ACTIONS_CALL_API");
      // console.log(action.data);
      return {
        sellData: action.data,
        addCard: [], // Clear the card
      };

    // Return the current state for all other action types
    default:
      return state;
  }
};
