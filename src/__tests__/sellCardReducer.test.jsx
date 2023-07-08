import { cardReducer } from '../components/SellBody/reducer'; 

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
      sellData: action.data,
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

it('should handle multiple ADD_TO_CARD actions', () => {
  const state = {
    addCard: [],
  };
  const action1 = {
    type: 'ADD_TO_CARD',
    payload: { assetid: '1', name: 'test' },
  };
  const action2 = {
    type: 'ADD_TO_CARD',
    payload: { assetid: '2', name: 'test2' },
  };
  const expectedState = {
    addCard: [{ ...action1.payload, qty: 1 }, { ...action2.payload, qty: 1 }],
  };
  const newState = cardReducer(state, action1);
  expect(cardReducer(newState, action2)).toEqual(expectedState);
});

it('should handle REMOVE_FROM_CARD action for non-existing item', () => {
  const state = {
    addCard: [{ assetid: '1', name: 'test', qty: 1 }],
  };
  const action = {
    type: 'REMOVE_FROM_CARD',
    payload: { assetid: '2' },
  };
  const expectedState = {
    addCard: [{ assetid: '1', name: 'test', qty: 1 }],
  };
  expect(cardReducer(state, action)).toEqual(expectedState);
});
