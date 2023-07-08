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
    // replace getByText with findByText to wait for the element to appear
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
  
});
