import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './Login';

test('renders LoginPage component', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  ); 

  // Check if the login form elements are rendered
  const usernameInput = screen.getByPlaceholderText('Username');
  expect(usernameInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText('Password');
  expect(passwordInput).toBeInTheDocument();


  const facebookButton = screen.getByText('Facebook');
  expect(facebookButton).toBeInTheDocument();



  const signupButton = screen.getByText('Sign up');
  expect(signupButton).toBeInTheDocument();
});

test('clicking Login button should navigate to /listing', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <LoginPage />
    </MemoryRouter>
  );

});

// You can continue writing additional tests for other functionalities of the LoginPage component
