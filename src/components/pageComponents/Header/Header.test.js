import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

test('renders the Header component with logo and cart/wishlist counts', () => {
  // Mock cart and wishlist data
  const mockCart = [/* ... */];
  const mockWishlist = [/* ... */];

  // Render the Header component
  render(
    <MemoryRouter>
      <Header cart={mockCart} wishlist={mockWishlist} />
    </MemoryRouter>
  );

  // Verify the presence of the logo image
  const logoImage = screen.getByAltText('Moonstride Logo');
  expect(logoImage).toBeInTheDocument();

  // Verify the presence of the cart and wishlist counts
  const cartCount = screen.getByTestId('cart-count');
  const wishlistCount = screen.getByTestId('wishlist-count');
  expect(cartCount).toHaveTextContent(mockCart.length.toString());
  expect(wishlistCount).toHaveTextContent(mockWishlist.length.toString());   
});
