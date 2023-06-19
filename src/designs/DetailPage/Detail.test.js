import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailsPage from './Detail';
import DetailSlider from '../../components/pageComponents/DetailSlider/DetailSlider'
import 'matchmedia-polyfill';
test('renders detail page testing',()=>{
    render(
        <MemoryRouter>
           <DetailsPage/> 
        </MemoryRouter>
    )

      // Check if the header component is rendered
  const headerElement = screen.getByTestId('header-component');
  expect(headerElement).toBeInTheDocument();

  // Check if the header component is rendered
  const backToPageElement = screen.getByTestId('backToPage-component');
  expect(backToPageElement).toBeInTheDocument();

 // Check if the header component is rendered
 const mainMenuElement = screen.getByTestId('mainMenu-component');
 expect(mainMenuElement).toBeInTheDocument();

  // Check if the header component is rendered
//   const sliderElement = screen.getByTestId('slider-component');
//   expect(sliderElement).toBeInTheDocument();

})