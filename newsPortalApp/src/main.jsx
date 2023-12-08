import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";
import {
  SavedNewsPage,
  LoginPage,
  RegisterPage,
  HomePage,
} from "./pages/pages.js";
import NewsSearchByCategories from "./components/NewsSearchByCategories.jsx";

const handleSubmit__form = function asdf() {
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />}>
        <Route
          path="/categories/:category"
          element={<NewsSearchByCategories />}
        />
      </Route>
      <Route path="saved-news" element={<SavedNewsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
