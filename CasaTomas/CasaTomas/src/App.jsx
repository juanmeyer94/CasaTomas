import {Route, Routes, Navigate} from "react-router-dom";
import {useSelector} from "react-redux"

import Home from "./Components/Home/Home"
import Test from "./Components/test/Test";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";





function App() {

  const isLogged = useSelector((state) => state.isLoggedIn);
 
  return (
   <div>
     <Routes>
     
      {isLogged ? (
          <Route path="/dashboard" element={<Dashboard />} />
          
        ) : (
          <Route path="/dashboard" element={<Navigate to="/login" />
        } />
        )}
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
     </Routes>



   </div>
  )
}

export default App
