// import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/sweetalert.css";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { router } from "./routers/routers";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
