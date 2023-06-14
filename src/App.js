import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**Imported components */
import LoginPage from './designs/LoginPage/Login'
import ListingPage from './designs/ListingPage/Listing'
import DetailPage from './designs/DetailPage/Detail';
import './App.css';     


/**root setup */
const router = createBrowserRouter([
  {
    path : '/',
    element : <LoginPage/>  
  },
  {
    path : '/listing',
    element : <ListingPage/>  
  },
  {
    path : '/detail/:id',
    element : <DetailPage/>  
  }
])

function App() {
  return (
      <main>
        <RouterProvider router={router}></RouterProvider>
      </main>
  );
}

export default App;
