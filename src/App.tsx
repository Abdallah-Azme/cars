import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/shared/Layout";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PublicRoute from "./components/shared/PuplicRoute";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import { SingleProductPage } from "./pages/SingleProductPage";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/login",
      element: <PublicRoute> <LoginPage /> </PublicRoute>,
    },
    {
      path: "/register",
      element: <PublicRoute> <RegisterPage /> </PublicRoute>,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element:<ProtectedRoute> <HomePage /> </ProtectedRoute>,
        },
        {
          path: "/products",
          element: <ProtectedRoute> <ProductPage /> </ProtectedRoute>,
        },
        {
          path: "/favorites",
          element: <ProtectedRoute> <ProductPage /> </ProtectedRoute>,
        },
        {
          path: "/categories",
          element: <ProtectedRoute> <CategoriesPage /> </ProtectedRoute>,
        },
        {
          path: "/products/:id",
          element: <ProtectedRoute> <SingleProductPage /> </ProtectedRoute>,
        }
      ],
    },
  ]);

  const queryClient = new QueryClient()

  
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-right"/>
      <RouterProvider router={routers} />
      </QueryClientProvider>
    </>
  );
}

export default App;
