import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/shared/Layout";
import ProductPage from "./pages/ProductPage";
import { SingleProductPage } from "./pages/SingleProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import UsersPage from "./pages/UsersPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProductPage />,
        },
        {
          path: "/categories",
          element: <CategoriesPage />,
        },
        {
          path: "/products/:id",
          element: <SingleProductPage />,
        },
        {
          path: "/users",
          element: <UsersPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
