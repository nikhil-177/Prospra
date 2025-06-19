import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const AppRoutes = () => {
  const router = createBrowserRouter([]);

  return <RouterProvider router={router} />;
};
