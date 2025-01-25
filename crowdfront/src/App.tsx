import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Layout,ProtectedRoute} from "./layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Chat from "./components/Chat/Chat";
import ChatPage from "./pages/Chats/ChatPage";
import ChatLayout from "./pages/Chats/ChatLayout";
import Profilepage from "./pages/Profile/Profilepage";
import ProjectIdeaPage from "./pages/home/ProjectDetails";
import HomePage from "./pages/home/Homepage";



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
          element: <Profilepage/>
        },
        {
          path: "dashboard",
          element: <HomePage/>
        },
        {
          path: '/chats',
          element: <ChatLayout />,
          children: [
            {
              path: '',
              element: <Chat />,
            },
            {
              path: ':id',
              element: <ChatPage />,
            },
          ],
        },
        {
          path:"projects/:id",
          element: <ProjectIdeaPage/>
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
