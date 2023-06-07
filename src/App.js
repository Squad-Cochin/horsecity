import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**Imported components */
import Home from './pages/Home'
import './App.css';     

/**root setup */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Home/>  
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
