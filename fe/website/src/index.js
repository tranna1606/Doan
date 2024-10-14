import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterCustom from './router';
import './style/style.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from 'core/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <UserProvider>

    <GoogleOAuthProvider clientId="489548495600-8d59c62a3kvnkoj5kdovmrc9lto6j0am.apps.googleusercontent.com">
        
        <RouterCustom />
    </GoogleOAuthProvider>
    </UserProvider>
    </BrowserRouter>,
);
