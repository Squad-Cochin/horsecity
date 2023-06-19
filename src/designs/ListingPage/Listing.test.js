import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingPage from './Listing';

test('renders ListingPage component', () => {
    render(
        <MemoryRouter>
            <ListingPage/>
        </MemoryRouter>
      );
  // Check if the header component is rendered
  const headerElement = screen.getByTestId('header-component');
  expect(headerElement).toBeInTheDocument();

  // Check if the listing search bar is rendered
  const searchBarElement = screen.getByTestId('listing-searchbar');
  expect(searchBarElement).toBeInTheDocument();

  // Check if the activity filter  is rendered
  const activityFilterElement = screen.getByTestId('activityFilter-component');
  expect(activityFilterElement).toBeInTheDocument();

  // Check if the sidebar bar is rendered
  const sideBarElement = screen.getByTestId('sidebar-component');
  expect(sideBarElement).toBeInTheDocument();

  // Check if the listing probox is rendered
  const listingProboxElement = screen.getByTestId('listingProbox-component');
  expect(listingProboxElement).toBeInTheDocument();

});
