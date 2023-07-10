import { renderHook, act } from "@testing-library/react-hooks";
import useSkins from '../hooks/useBotSkins';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('useSkins', () => {
  const botId = '1';
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/botitems/forsale/${botId}`;
  const skinsData = [
    {
      "assetid": 30029241635,
      "market_hash_name": "XM1014 | Blue Spruce (Field-Tested)",
      "marketable": 1,
      "tradable": 1,
      "image": "-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgporrf0e1Y07ODHTjBN_8-JmYWPnuL5feuJwjlVscQhj7rH9tzw2wXmqkNlYG-hJNWSegc9Zl-E_QK9xbjr08Si_MOejgzGL-s",
      "price": 0.03,
      "item_wear": "FT",
      "inspect": "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198314899758A30029241635D5667901354048606797",
      "classid": 310777325,
      "instanceid": 302028390,
      "paintwear": null,
      "paintindex": null,
      "paintseed": null,
      "status": "for_sale",
      "listed_price": "14.00"
    },
    // add more items here
  ];
  beforeAll(() => {
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
//TODO:: Double check these test, they feels kinda odd!
  it('fetches and sets the skins data correctly when response is successful', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(skinsData),
    });

    const { result, waitForNextUpdate } = renderHook(() => useSkins(botId));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(global.fetch).toBeCalledWith(apiUrl);
    expect(result.current).toEqual(skinsData);
  });

  it('sets skins data to an empty array when the fetch operation fails', async () => {
    const errorMessage = 'Server error';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useSkins(botId));

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(global.fetch).toBeCalledWith(apiUrl);
    expect(result.current).toEqual([]);
  });

  it('sets skins data to an empty array when the response is not ok', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(skinsData), { status: 500 });
  
    const { result, waitForNextUpdate } = renderHook(() => useSkins(botId));
  
    await act(async () => {
      await waitForNextUpdate();
    });
  
    expect(fetchMock).toBeCalledWith(apiUrl);
    expect(result.current.length).toEqual(0);
  });
  
});