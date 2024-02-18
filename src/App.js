import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./utils/PrivateRoute";
import Fallback from "./pages/Fallback";
import ResponseAlert from "./components/Snackbar/ResponseAlert";
import { useSelector, useDispatch } from "react-redux";
import { setOpenResponse } from "./reducers/ResponseSlice";
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const MyProducts = React.lazy(() => import("./pages/MyProducts"));
const Products = React.lazy(() => import("./pages/Products"));
const SingleProduct = React.lazy(() => import("./pages/SingleProduct"));
const Chat = React.lazy(() => import("./pages/Chat"));
const CompanyProfile = React.lazy(() =>
  import("./components/Profile/CompanyProfile")
);

const GovernmentSection = React.lazy(() => import("./pages/GovernmentSchemes"));

const App = () => {
  const dispatch = useDispatch();
  const { openResponse, errorStatus, errorValue } = useSelector(
    (state) => state.response
  );
  return (
    <>
      <Header />
      <ResponseAlert
        openResponse={openResponse}
        setOpenResponse={(value) => dispatch(setOpenResponse(value))}
        errorStatus={errorStatus}
        errorValue={errorValue}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
        <Route
          path="/myprofile"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
        <Route
          path="/profile/:id"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <CompanyProfile />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
        <Route
          path="/products"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
        <Route
          path="/myproducts"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <MyProducts />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <SingleProduct />
              </PrivateRoute>
            </Suspense>
          }
          exact
        />
          <Route
          path="/chats"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            </Suspense>
        }
          exact
        />
        <Route
          path="/chats/:id"
          element={
            <Suspense fallback={<Fallback />}>
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            </Suspense>
        }
          exact
        />
        <Route
          path="/user/login"
          element={
            <Suspense fallback={<Fallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/user/signup"
          element={
            <Suspense fallback={<Fallback />}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/schemes"
          element={
            <Suspense fallback={<Fallback />}>
              <GovernmentSection />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
