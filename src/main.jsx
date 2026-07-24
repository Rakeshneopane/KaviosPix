import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Navigate } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { GoogleCallbackPage } from './pages/GoogleCallbackPage.jsx';
import { DashBoardPage } from './pages/DashBoardPage.jsx';
import { ProtectedRoute } from './routes/ProtectedRoute.jsx';
import AlbumsPage from './components/albums/AlbumsPage.jsx';
import AlbumDetailPage from "./components/albums/AlbumDetailsPage.jsx"
import LandingPage from "./pages/LandingPage.jsx";
import { Toaster } from "sonner";


import RouteErrorPage from "./pages/RouteErrorPage.jsx";
import RouteLoadingPage from "./pages/RouteLoadingPage.jsx";

const router = createBrowserRouter([ 
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/v1/profile/google",
    element: <GoogleCallbackPage />
  },
  {
    element: (
      <ProtectedRoute> 
        <App /> 
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement:  <RouteLoadingPage />,
    children: [   
      {
        path: "/dashboard",
        element: <DashBoardPage />
      },
      {
        path: "/albums",
        element: <AlbumsPage />
      },
      {
        path: "/album/:albumId",
        element: <AlbumDetailPage />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
      
    </Provider>
  </>,
)
