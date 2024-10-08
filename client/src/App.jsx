import { Route, Routes, BrowserRouter } from "react-router-dom";
import Listing from "./Pages/MyListing";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import Navigate from "./Pages/Navigate";
import Cookies from "js-cookie";
import CreateListing from "./Pages/CreateListing";
import { useDispatch, useSelector } from "react-redux";
import { insertingData, setloading } from "./Redux/Slice/UserSlice";
import Editlisting from "./Pages/Editlisting";
import DisplayListing from "./Pages/DisplayListing";
import About from "./Pages/About";
import Search from "./Pages/Search";

function App() {
  {
    /*const dispatch = useDispatch();
    dispatch(insertingData({}));*/
    /*dispatch(setloading());*/
  }
  const data = useSelector((state) => state.user.userdata);
  const keys = Object.keys(data);
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          {keys.length == 0 && (
            <Route path="sign-in" element={<SignIn />}></Route>
          )}

          {keys.length == 0 && (
            <Route path="sign-up" element={<SignUp />}></Route>
          )}
          {keys.length == 0 && (
            <Route path="sign-in" element={<SignIn />}></Route>
          )}
          {keys.length > 0 && (
            <Route path="listing" element={<Listing />}></Route>
          )}
          {keys.length > 0 && (
            <Route path="edit-listing/:id" element={<Editlisting />}></Route>
          )}
          {keys.length > 0 && (
            <Route path="profile" element={<Profile />}></Route>
          )}
          {keys.length > 0 && (
            <Route path="create-Listing" element={<CreateListing />}></Route>
          )}
          {keys.length > 0 && (
            <Route
              path="display-listing/:id"
              element={<DisplayListing />}
            ></Route>
          )}
          <Route path="home" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="search/?" element={<Search />}></Route>
          <Route path="*" element={<Navigate />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
