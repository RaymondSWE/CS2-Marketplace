import { cardReducer } from '../components/BuyBody/reducer'; 

describe('cardReducer', () => {
  it('should handle ADD_TO_CARD action', () => {
    const state = {
      addCard: [],
    };
    const action = {
      type: 'ADD_TO_CARD',
      payload: { assetid: '1', name: 'test' },
    };
    const expectedState = {
      addCard: [{ ...action.payload, qty: 1 }],
    };
    expect(cardReducer(state, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_FROM_CARD action', () => {
    const state = {
      addCard: [{ assetid: '1', name: 'test', qty: 1 }],
    };
    const action = {
      type: 'REMOVE_FROM_CARD',
      payload: { assetid: '1' },
    };
    const expectedState = {
      addCard: [],
    };
    expect(cardReducer(state, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS_CALL_API action', () => {
    const state = {
      addCard: [{ assetid: '1', name: 'test', qty: 1 }],
    };
    const action = {
      type: 'ACTIONS_CALL_API',
      data: { data: 'newData' },
    };
    const expectedState = {
      buyData: action.data,
      addCard: [],
    };
    expect(cardReducer(state, action)).toEqual(expectedState);
  });

  it('should handle default action', () => {
    const state = {
      addCard: [],
    };
    const action = {
      type: 'UNKNOWN',
    };
    expect(cardReducer(state, action)).toEqual(state);
  });
});
