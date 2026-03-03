import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/shared/Layout";
import HomePage from "./pages/HomePage";
import { RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import  RegisterPage from "./pages/RegisterPage";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/login",
      element:<LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
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
