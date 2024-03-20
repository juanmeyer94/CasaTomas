import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"

import Home from "./Components/Home/Home"
import Test from "./Components/test/Test";
import Login from "./Components/Login/Login";
import Contact from "./Components/Contact/Contact";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider } from "./Components/Dashboard/Context/AdminContext"
import ProtectedRoutes from "./Components/ShieldRoutes/ProtectedRoutes";
import { ItemsProvider } from "./Components/Dashboard/Context/ItemsContext";
import AboutUs from "./Components/AboutUs/AboutUs"





function App() {

  const isLogged = useSelector((state) => state.isLoggedIn);

  return (
    <div>
      <AuthProvider>
        <ItemsProvider>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            
              <Route path="/dashboard" element={<Dashboard />} />

           
          </Route>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        </ItemsProvider>
      </AuthProvider>

    </div>
  )
}

export default App
