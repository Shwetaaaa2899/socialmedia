import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../src/context/authcontext"
import PostsProvider from "../src/context/postcontext"
import  {UserProvider} from "../src/context/usercontext"


// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <BrowserRouter>
 
    <AuthProvider>

      <UserProvider>
        <PostsProvider>

          <App />
        </PostsProvider>

      </UserProvider>

    </AuthProvider>

  </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 44"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIzNTdkN2Q0Mi0xODQyLTQ2NTctYWEyMS02ZTVmNDliMGExMjIiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.yKh8yV3Bn0UNOuNuqo7VfLunBMF6hpwERqoSIc9QTfQ"