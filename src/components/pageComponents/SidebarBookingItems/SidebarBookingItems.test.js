import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SidebarBooking from './SidebarBookingItems';

const mockCart = [
  {
    id: 1,
    name: 'Product 1',
    vehicleType: 'Type 1',
    price: '10.00',
    company: 'Company 1',
  },
  {
    id: 2,
    name: 'Product 2',
    vehicleType: 'Type 2', 
    price: '20.00',
    company: 'Company 2',
  },
];
test('renders SidebarBooking component with cart items', () => {
    render(<SidebarBooking cart={mockCart} setCart={() => {}} />);
  
    // Check if the cart title is rendered
    const cartTitle = screen.getByText(/Your cart/i);
    expect(cartTitle).toBeInTheDocument();
  
    // Check if the cart items are rendered
    const cartItems = screen.getAllByTestId('cart-item');
    expect(cartItems).toHaveLength(mockCart.length);
  
    // Check if the delete buttons are rendered for each cart item
    mockCart.forEach((item) => {
      const deleteButton = screen.getByTestId(`delete-button-${item.id}`);
      expect(deleteButton).toBeInTheDocument();
    });
  
    // You can continue writing similar tests for other elements within SidebarBooking
  });
  
