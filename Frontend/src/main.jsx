import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

import Layout from './Layout.jsx';
import Home from './Components/Home/Home.jsx';
import AuthPage from './Components/Login/Login.jsx';
import Reviews from './Components/Reviews/reviews.jsx';
import { UserProvider } from './Context/UserContext.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
        </>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UserProvider>  
            <RouterProvider router={router} />
        </UserProvider>
    </StrictMode>
);
