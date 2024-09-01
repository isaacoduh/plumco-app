import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/layout";
import AuthLayout from "./components/auth/layout";
import CheckAuth from "./components/shared/checkAuth";
import ShopLayout from "./components/shop/layout";
import { Skeleton } from "./components/ui/skeleton";
import AdminDashboard from "./pages/admin/dashboard";
import AdminOrders from "./pages/admin/orders";
import AdminProducts from "./pages/admin/products";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import NotFound from "./pages/not-found";
import ShopAccount from "./pages/shop/account";
import ShopCheckout from "./pages/shop/checkout";
import ShopHome from "./pages/shop/home";
import ShopListing from "./pages/shop/listing";
import PaymentSuccessPage from "./pages/shop/payment-success";
import PaypalReturnPage from "./pages/shop/paypal-return";
import SearchProducts from "./pages/shop/search";
import UnauthPage from "./pages/unauth-page";
import { checkAuth } from "./store/authSlice";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  // console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHome />}></Route>
          <Route path="listing" element={<ShopListing />} />
          <Route path="account" element={<ShopAccount />}></Route>
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
