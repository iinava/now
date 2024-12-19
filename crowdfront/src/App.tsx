import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout,ProtectedRoute} from "./layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "",
          element: <h1>hi</h1>
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element:<Register/>
        }
      ]
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "profile",
          element: <h1>hi</h1>
        },
        {
          path: "dashboard",
          element: <h1>hi</h1>
        },
        {
          path:"campaigns/:slug",
          element: <h1>hi</h1>
        },
        {
          path:"campaign/category/:category",
          element: <h1>hi</h1>
        }
        ,{
          path:"*",
          element: <h1>hi</h1>
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
