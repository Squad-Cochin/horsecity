import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**Imported components */
import LoginPage from './designs/LoginPage/Login'
import ListingPage from './designs/ListingPage/Listing'
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
