import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from "./pages/HomePage";


function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>

          <Route path="/" element={<HomePage />} />

        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;
