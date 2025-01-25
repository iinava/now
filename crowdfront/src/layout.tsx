import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice.ts";
import { useEffect } from "react";
import { UserNavbar } from "./components/Navbars/UserNavbar.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import Footer from "./components/Footer.tsx";

function Layout() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state:any) => state.auth.isAuthorized);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

//if aldready authorized then navigate to dashboard , user should manually logout only to visit those pages again

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="flex flex-col min-h-screen">
      <div className="navbar">
        <h1>navbarout</h1>
      </div>
      <div className="flex-grow">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

function ProtectedRoute() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state:any) => state.auth.isAuthorized);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  
//if not logged in navigate to login / register page

  return !isAuthorized ? (
    <Navigate to="/login" />
  ) : (
    <div className="flex flex-col min-h-screen">
      <div className="navbar">
        <UserNavbar/>
      </div>
      <div className="flex-grow">
        <Outlet />
        <Toaster />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export { Layout, ProtectedRoute };
