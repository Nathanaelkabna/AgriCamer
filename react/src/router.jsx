import { Navigate, createBrowserRouter } from "react-router-dom";
import Contact from "./components/userComponent/Contact";
import DefaultLayout from "./components/DefaultLayout";
import Acceuil from "./components/userComponent/Accueil";
import Produits from "./components/userComponent/Produits";
import GuestLayout from "./components/adminComponent/GuestLayout";
import Login from "./components/adminComponent/Login";
import SignUp from "./components/adminComponent/SignUp";
import DashBoard from "./components/adminComponent/DashBoard";
import Admin from "./components/adminComponent/Admin";
import Products from "./components/adminComponent/Produits";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/accueil" />,
  },

  {
    path: "/admin",
    element: <DashBoard/>,
    children: [
      {
        path: "",
        element: <Admin />
      },
      {
        path: "products",
        element: <Products />
      }
    ]
  },

  {
    path: "/admin",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/accueil",
        element: <Acceuil />,
      },
      {
        path: "/produits",
        element: <Produits />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },









]);
export default router;
