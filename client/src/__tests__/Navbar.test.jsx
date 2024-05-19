import { render, screen, act  } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import React from 'react';
import axios from 'axios';
import "@testing-library/jest-dom";


jest.mock('axios', () => {
    return {
      get: jest.fn().mockResolvedValue({ data: { 
        provider: "steam",
        _json: {
          steamid: "76561198314899758",
          personaname: "Raymond",
          avatar: "https://avatars.steamstatic.com/0ca81a460e2f2adb4dee9bceecc66f811dfb5960.jpg",
        },
        id: "76561198314899758",
        displayName: "Raymond",
        photos: [
          {
            value: "https://avatars.steamstatic.com/0ca81a460e2f2adb4dee9bceecc66f811dfb5960.jpg"
          }
        ],
        identifier: "https://steamcommunity.com/openid/id/76561198314899758",
        users: []
      } }),
    };
});

describe('Navbar', () => {

  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renders CsfairTrade brand', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByRole('link', { name: /CSFairTrade/i });
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Home link', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Buy link', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByText(/Buy/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Sell link', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByText(/Sell/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders Exchange link', () => {
    render(<Router><Navbar /></Router>);
    const linkElement = screen.getByText(/Exchange/i);
    expect(linkElement).toBeInTheDocument();
  });
});
