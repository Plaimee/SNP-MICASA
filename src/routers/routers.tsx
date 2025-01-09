import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { publicRoutes, privateRoutes } from "@/routers/menu";
import MainPrivateLayout from "../layouts/MainPrivateLayout";
import MainPublicLayout from "../layouts/MainPublicLayout";

const element = createRoutesFromElements(
  <>
    <Route path="*" element={<></>} />

    {/* public route */}
    <Route element={<MainPublicLayout />}>
      {publicRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>

    {/* private route */}
    <Route element={<MainPrivateLayout />}>
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
  </>
);

export const router = createBrowserRouter(element);
