import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import CitiesProvider from "./contexts/CitiesProvider";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import NotFoundPage from "./pages/NotFoundPage";
// import AppLayout from "./pages/AppLayout";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// npm run build
// dist/index.html                   0.48 kB │ gzip:   0.31 kB
// dist/assets/index-lVNi80P4.css    8.96 kB │ gzip:   2.27 kB
// dist/assets/index-C-Jrxx0b.js   447.46 kB │ gzip: 138.01 kB


const Login = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));


export default function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />} >
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />

              <Route path="app" element={
                <ProtectedRoute path='/login'>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
