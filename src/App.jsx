import {Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home"
import Test from "./Components/test/Test";
import Login from "./Components/Login/Login";


function App() {

  return (
   <div>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
     </Routes>



   </div>
  )
}

export default App
