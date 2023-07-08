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



  

});
