import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ButtonType from './Button';

describe('ButtonType', () => {
  test('renders button with default props', () => {
    render(<ButtonType />);
    const button = screen.getByRole('button', { name: '' });
    expect(button).toBeInTheDocument();
    expect(button.disabled).toBe(false);
    expect(button).toHaveClass('btntype2');
  });

  test('renders button with custom props', () => {
    const onClickMock = jest.fn();
    render(
      <ButtonType
        name="Custom Button"
        value="Custom Value"
        className="custom-button"
        onClick={onClickMock}
      />
    );
    const button = screen.getByRole('button', { name: 'Custom Button' });
    expect(button).toBeInTheDocument();
    expect(button.disabled).toBe(false);
    expect(button).toHaveClass('custom-button');

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
