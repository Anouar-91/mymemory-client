import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import React, { useState } from 'react';
import AuthAPI from './services/AuthAPI';
import AuthContext from './contexts/AuthContext'
import ProtectedRoute from "./components/ProtectedRoute";
import EnWordPage from "./pages/EnWordPage";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddEnWordPage from "./pages/AddEnWordPage";
import AddTranslationPage from "./pages/AddTranslationPage";


AuthAPI.setup();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated());

  return (
    <AuthContext.Provider value={{
      isAuthenticated: isAuthenticated,
      setIsAuthenticated: setIsAuthenticated
    }}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route element={<ProtectedRoute />}>
            <Route path="/en_words/new" element={<AddEnWordPage />} />
              <Route path="/en_words" element={<EnWordPage />} />
              <Route path="/add_translation/:id" element={<AddTranslationPage />} />

            </Route>
            <Route path="/login" element={<LoginPage  />} />

            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer position="top-center" />

    </AuthContext.Provider>

  );
}

export default App;
