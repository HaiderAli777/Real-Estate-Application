import { Route, Routes, BrowserRouter } from "react-router-dom";
import About from "./Pages/About";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import Navigate from "./Pages/Navigate";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { insertingData, setloading } from "./Redux/Slice/UserSlice";
function App() {
  {
    /* const dispatch = useDispatch();
    dispatch(insertingData({}));
    /*
    
  dispatch(setloading());*/
  }
  const data = useSelector((state) => state.user.userdata);
  const keys = Object.keys(data);
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="home" element={<Home />}></Route>
          {keys.length == 0 && (
            <Route path="sign-in" element={<SignIn />}></Route>
          )}
          {keys.length == 0 && (
            <Route path="sign-up" element={<SignUp />}></Route>
          )}
          <Route path="about" element={<About />}></Route>
          {keys.length > 0 && (
            <Route path="profile" element={<Profile />}></Route>
          )}
          <Route path="*" element={<Navigate />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
