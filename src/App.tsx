// import './styles.css';
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./AuthComponents/Login";
import Signup from "./AuthComponents/Signup";
import ForgotPassword from "./AuthComponents/ForgotPassword";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Main from "./Components/Main/Main";
import ContentDashboard from "./Components/ContentDashboard/ContentDashboard";
import { useAuth } from "./AuthContext";
import TweetAnalitycs from "./Components/TweetAnalitycs";



function App() {
  const { currentUser, logOut }: any = useAuth();


  return (
    <div className="w-screen min-h-screen bg-background flex flex-col items-center text-white">
      <Router basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<PrivateRoute><ContentDashboard /></PrivateRoute>}/>
            <Route path="/main" element={<PrivateRoute><Main /></PrivateRoute>}/>
            <Route path="/analytics" element={<TweetAnalitycs />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

