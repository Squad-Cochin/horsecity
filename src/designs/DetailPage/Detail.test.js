import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsPage from './Detail';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test('renders detail page testing', () => {
  render(
    <MemoryRouter>
      <DetailsPage />
    </MemoryRouter>
  );

  // Check if the header component is rendered
  const headerElement = screen.getByTestId('header-component');
  expect(headerElement).toBeInTheDocument();

  // Check if the backToPage component is rendered
  const backToPageElement = screen.getByTestId('backToPage-component');
  expect(backToPageElement).toBeInTheDocument();

  // Check if the mainMenu component is rendered
  const mainMenuElement = screen.getByTestId('mainMenu-component');
  expect(mainMenuElement).toBeInTheDocument();

  // Check if the slider component is rendered
  // const sliderElement = screen.getByTestId('slider-component');
  // expect(sliderElement).toBeInTheDocument();
});
