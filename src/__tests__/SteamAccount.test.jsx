import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SteamAccount from '../components/SteamAccount/SteamAccount';
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock-jest';

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
  
});
