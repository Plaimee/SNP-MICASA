// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "./styles/global.css";

import { RouterProvider } from 'react-router-dom';
import { router } from './routers/routers';


createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
