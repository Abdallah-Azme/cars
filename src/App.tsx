import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import Layout from "./components/shared/Layout";
import PublicRoute from "./components/shared/PuplicRoute";
import CategoriesPage from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import { SingleProductPage } from "./pages/SingleProductPage";
import ProfilePage from "./pages/ProfilePage";
import { getSettingsApi } from "./api/settings";
import { useSettingsStore } from "./stores/settings";
import { useEffect } from "react";
import { DynamicHead } from "./components/shared/DynamicHead";
import NotFoundPage from './pages/NotfoundPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import FavoraitesPage from './pages/FavoraitesPage';
function App() {
  const routers = createBrowserRouter([
    {
      path: "/login",
      element: (
        <PublicRoute>
          {" "}
          <LoginPage />{" "}
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          {" "}
          <RegisterPage />{" "}
        </PublicRoute>
      ),
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
          element:<ProtectedRoute><FavoraitesPage /></ProtectedRoute>,
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
          path: "/profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  const queryClient = new QueryClient();
  const setSettings = useSettingsStore((state) => state.setSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettingsApi();
        if (response.ok && response.data?.data) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, [setSettings]);

  return (
    <>
      <DynamicHead />
      <QueryClientProvider client={queryClient}>
      <Toaster richColors position="bottom-right"/>
      <RouterProvider router={routers} />
      </QueryClientProvider>
    </>
  );
}

export default App;
