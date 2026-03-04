import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/shared/Layout";
import CategoriesPage from "./pages/CategoriesPage";
import FavoraitesPage from "./pages/FavoraitesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import { SingleProductPage } from "./pages/SingleProductPage";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/products",
          element: <ProductPage />,
        },
        {
          path: "/favorites",
          element: <FavoraitesPage />,
        },
        {
          path: "/categories",
          element: <CategoriesPage />,
        },
        {
          path: "/products/:id",
          element: <SingleProductPage />,
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
