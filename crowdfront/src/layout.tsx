import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/authSlice.ts";
import { useEffect } from "react";
import { UserNavbar } from "./components/Navbars/UserNavbar.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

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
    <div className="flex min-h-screen bg-black">
      {/* Left Sidebar - hidden on mobile, visible on md+ screens */}
      <div className="hidden md:block w-64 border-r border-gray-800 fixed h-full">
        <UserNavbar variant="sidebar" />
      </div>
      
      {/* Top Navbar - visible on mobile, hidden on md+ screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
        <UserNavbar variant="topbar" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64 w-full">
        <div className="flex-grow mt-16 md:mt-0">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export { Layout, ProtectedRoute };
