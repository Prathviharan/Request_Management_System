import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Dashboard from "./pages/Dashboard";
import Request from "./pages/Request";
import Reports from "./pages/Report";
import Feedback from "./pages/Feedback";

const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen min-w-screen min-w-[600px]">
        {!isSignedIn ? (
          <div 
            className="bg-cover bg-center min-h-screen"
            style={{
              backgroundImage: "",
            }}
          >
            <div className="flex justify-center items-center h-screen">
              <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
                <h2 className="text-2xl font-bold mb-6">
                  Request Management System
                </h2>
                <button
                  className="bg-[#830823] text-white px-6 py-3 rounded-full hover:bg-orange-600 transition duration-300"
                  onClick={() => setIsSignedIn(true)}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Navbar />

            <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/requests" element={<Request />} />
                <Route path="/feedbacks" element={<Feedback />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
