import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { publicRoutes, routes } from '@/routers/menu';
import MainPrivateLayout from "./MainPrivateLayout";

const element = createRoutesFromElements(
  <>
    <Route path="*" element={<></>} />

    {/* public route */}
    {publicRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={route.element} />
    ))}

    {/* private route */}
    <Route element={<MainPrivateLayout />}>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
  </>
);

export const router = createBrowserRouter(element);