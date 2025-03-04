import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Linkpage from "./pages/Linkpage";
import Dashboard from "./pages/dashboard";
import Login from "./pages/components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IframeView from '../src/pages/components/InnerComponents/iframeview';
import { RecordProvider } from "./context/RecordContext";
import Register from "./pages/components/Register";

// PrivateRoute Component to restrict access based on authentication
const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("AuthToken");
  const uuid = localStorage.getItem("UUID");

  // If the token or UUID exists, it means the user is logged in, so allow access to the route
  return token && uuid ? element : <Navigate to="/login" />;
};

// Redirect to Linkpage if already logged in
const RedirectIfLoggedIn = ({ element }) => {
  const token = localStorage.getItem("AuthToken");
  const uuid = localStorage.getItem("UUID");

  // If token and uuid exist, redirect to Linkpage, otherwise allow access to the route
  return token && uuid ? <Navigate to="/linkpage" /> : element;
};

function App() {
  return (
    <Router>
      {/* Wrap your Routes with RecordProvider to provide context */}
      <RecordProvider>
        <div>
          <Routes>
            {/* Redirect to /linkpage if already logged in */}
            <Route path="/" element={<RedirectIfLoggedIn element={<Navigate to="/linkpage" />} />} />
            
            {/* Login route */}
            <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
            
            {/* Register route */}
            <Route path="/register" element={<Register />} />
            
            {/* Linkpage route with PrivateRoute logic */}
            <Route path="/linkpage" element={<PrivateRoute element={<Linkpage />} />} />
            
            {/* Dashboard route with PrivateRoute logic */}
            <Route path="/dashboard/:category/:analyticsId" element={<PrivateRoute element={<Dashboard />} />} />
            
            {/* IframeView route */}
            <Route path="/iframeview" element={<IframeView />} />
          </Routes>
        </div>
        {/* ToastContainer for notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </RecordProvider>
    </Router>
  );
}

export default App;
