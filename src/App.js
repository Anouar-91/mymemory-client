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
import UpdateWordsPage from "./pages/UpdateWordsPage";
import QuizEnWordPage from "./pages/QuizEnWordPage";
import RegisterPage from "./pages/RegisterPage";


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
              <Route path="/update_words/:id" element={<UpdateWordsPage />} />
              <Route path="/quiz_words" element={<QuizEnWordPage />} />

            </Route>
            <Route path="/login" element={<LoginPage  />} />
            <Route path="/register" element={<RegisterPage  />} />
            
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer position="top-center" />

    </AuthContext.Provider>

  );
}

export default App;
