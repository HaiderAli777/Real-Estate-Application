import { Route, Routes, BrowserRouter } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="sign-in" element={<SignUp />}></Route>
          <Route path="sign-up" element={<SignIn />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;