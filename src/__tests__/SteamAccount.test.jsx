import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SteamAccount from '../components/SteamAccount/SteamAccount';
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock-jest';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('SteamAccount', () => {
  
  const mockProps = {
    response: {
      _json: {
        steamid: '123456',
        avatarfull: '',
      },
      displayName: 'Test User'
    }
  };
  
  beforeEach(() => {
    fetchMock.reset();
  });

  it('renders without crashing', () => {
    render(<SteamAccount {...mockProps} />);
    expect(screen.getByText('Connect your Steam trade link to your account!')).toBeInTheDocument();
  });

  it('displays user name correctly', async () => {
    render(<SteamAccount {...mockProps} />);
    expect(await screen.findByText('Test User')).toBeInTheDocument();
  });

  it('validates trade link correctly', async () => {
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText('Enter your Trade URL here');
    const applyButton = screen.getByText('Apply');
    fireEvent.change(inputField, { target: { value: 'Invalid trade link' } });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid Steam trade link', { theme: "colored" });
    });
  });

  it('handles successful trade link update correctly', async () => {
    const tradeUrl = `${process.env.REACT_APP_API_URL}/api/user/addUserTradeLink`;
    const successfulResponse = { success: true };
    fetchMock.post(tradeUrl, successfulResponse);
  
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText('Enter your Trade URL here');
    const applyButton = screen.getByText('Apply');
    fireEvent.change(inputField, { target: { value: 'https://steamcommunity.com/tradeoffer/new/?partner=354634030&token=KAoqD920' } });
    fireEvent.click(applyButton);
  
    await waitFor(() => {
      const lastCall = fetchMock.lastCall(tradeUrl);
      expect(lastCall).toBeDefined();
    });
  
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Trade Link added successfully!', { theme: "colored" });
    });
  });

  it('handles trade link update error correctly', async () => {
    const tradeUrl = `${process.env.REACT_APP_API_URL}/api/user/addUserTradeLink`;
    const errorResponse = { error: 'Server error' };
    fetchMock.post(tradeUrl, { status: 500, body: errorResponse });
    
    render(<SteamAccount {...mockProps} />);
    const inputField = screen.getByPlaceholderText('Enter your Trade URL here');
    const applyButton = screen.getByText('Apply');
    fireEvent.change(inputField, { target: { value: 'https://steamcommunity.com/tradeoffer/new/?partner=354634030&token=KAoqD920' } });
    fireEvent.click(applyButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Server error', { theme: "colored" });
    });
  });


  it('displays user avatar correctly', async () => {
    render(<SteamAccount {...mockProps} />);
    const avatarImage = screen.getByAltText('');
    expect(avatarImage).toHaveAttribute('src', mockProps.response._json.avatarfull);
});

it('displays trade URL instruction correctly', async () => {
  render(<SteamAccount {...mockProps} />);
  
  const tradeURLInstruction = screen.getByText('How to get a Steam trade URL?');
  const instructionText = screen.getByText('CSFairTrade requires a Steam trade URL for trading. The steam trade URL can be obtained by clicking the "Click here to get trade URL" button and you will be redirected to the Valve website. Copy the URL and paste it below. Click "Apply" to save your trade URL');
  const getTradeURLButton = screen.getByText('Click here to get trade URL');
  
  expect(tradeURLInstruction).toBeInTheDocument();
  expect(instructionText).toBeInTheDocument();
  expect(getTradeURLButton).toBeInTheDocument();
});

it('closes the modal when "Close" button is clicked', async () => {
  render(<SteamAccount {...mockProps} />);
  
  const closeButton = screen.getByText('Close');
  fireEvent.click(closeButton);
  
  const modal = screen.queryByTestId('steam-account-modal');
  expect(modal).not.toBeInTheDocument();
});


it('displays error message when steamid is not available', async () => {
  const mockPropsWithoutSteamID = { response: { _json: null } };
  render(<SteamAccount {...mockPropsWithoutSteamID} />);
  
  const errorMessage = screen.getByText('Error: steamid is not available');
  expect(errorMessage).toBeInTheDocument();
});


it('updates the trade link input field correctly', async () => {
  render(<SteamAccount {...mockProps} />);
  
  const inputField = screen.getByPlaceholderText('Enter your Trade URL here');
  const newTradeLink = 'https://steamcommunity.com/tradeoffer/new/?partner=123456&token=abcdef';
  
  fireEvent.change(inputField, { target: { value: newTradeLink } });
  
  expect(inputField.value).toBe(newTradeLink);
});


});
