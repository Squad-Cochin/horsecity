import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingProbox from './ListingProbox';

describe('ListingProbox', () => {
  test('handles item click correctly', () => {
    const setWishlist = jest.fn();
    const item = {
      id: 0,
      picture: 'https://via.placeholder.com/250x250',
      name: 'Rosetta Massey',
      vehicleType: 'international',
      company: 'Maryellen',
      description:
        'Commodo labore do officia dolore non. Ipsum labore veniam irure dolore in enim aute in consequat consequat dolore. Magna elit consequat eiusmod cupidatat. Esse ea pariatur aliqua nulla do enim. Nulla ex occaecat id veniam. Eiusmod minim aute fugiat ex qui duis nostrud amet in veniam exercitation dolor.\r\n',
      price: '2,109.54',
      isActive: true,
    };

    render(
      <MemoryRouter>
        <ListingProbox
          boxData={[{ currency: 'AED', vehicle: [item] }]}
          wishlist={[]}
          setWishlist={setWishlist}
          setCart={() => {}}
        />
      </MemoryRouter>
    );

    const favoriteIcon = screen.getByTestId('favorite-icon');
    fireEvent.click(favoriteIcon);

    expect(localStorage.getItem('wishlisted')).toEqual(JSON.stringify([item.id]));
    expect(setWishlist).toHaveBeenCalledWith([item.id]);
  });

  test('adds item to cart correctly', () => {
    const setCart = jest.fn();
    const item = {
      id: 0,
      picture: 'https://via.placeholder.com/250x250',
      name: 'Rosetta Massey',
      vehicleType: 'international',
      company: 'Maryellen',
      description:
        'Commodo labore do officia dolore non. Ipsum labore veniam irure dolore in enim aute in consequat consequat dolore. Magna elit consequat eiusmod cupidatat. Esse ea pariatur aliqua nulla do enim. Nulla ex occaecat id veniam. Eiusmod minim aute fugiat ex qui duis nostrud amet in veniam exercitation dolor.\r\n',
      price: '2,109.54',
      isActive: true,
    };

    render(
      <MemoryRouter>
        <ListingProbox
          boxData={[{ currency: 'AED', vehicle: [item] }]}
          wishlist={[]}
          setWishlist={() => {}}
          setCart={setCart}
        />
      </MemoryRouter>
    );

    const addToCartButton = screen.getByText('Add to cart');
    fireEvent.click(addToCartButton);

    expect(localStorage.getItem('cart')).toEqual(JSON.stringify([item]));
    expect(setCart).toHaveBeenCalledWith([item]);
  });
});
