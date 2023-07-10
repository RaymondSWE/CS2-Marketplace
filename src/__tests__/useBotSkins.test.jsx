import { renderHook, act } from "@testing-library/react-hooks";
import useSkins from '../hooks/useBotSkins';

describe('useSkins', () => {
  const botId = '1';
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/botitems/forsale/${botId}`;
  const skinsData = [
    {
      "assetid": 29863072331,
      "market_hash_name": "AUG | Sweeper (Minimal Wear)",
      "marketable": 1,
      "tradable": 1,
      "image": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRw7P7NYjV9_92wkZSSlfv1MLDummJW4NE_3riWo9r2jFbs_RBrMW_1JteRIQA9YF6C-Fm4xenqhMW5uJTNySQy7D5i...",
    },
    // add more items here
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(skinsData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and sets the skins data correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSkins(botId));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual(skinsData);
  });

  it('handles errors gracefully', async () => {
    const errorMessage = 'Server error';
    global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

    const { result, waitForNextUpdate } = renderHook(() => useSkins(botId));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toEqual([]);
  });
});
