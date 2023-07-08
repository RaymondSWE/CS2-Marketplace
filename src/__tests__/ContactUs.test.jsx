import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from '../components/ContactUs/ContactUs';
import '@testing-library/jest-dom';


describe('ContactUs', () => {
  it('renders without crashing', () => {
    render(<ContactUs />);
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  it('renders email and message input fields', () => {
    render(<ContactUs />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your message here...')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactUs />);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });


  // TODO:: Add form submission test once its implemented for the component
});
