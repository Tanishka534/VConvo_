import React, { Suspense, lazy } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Avatar from "./pages/Avatar";
// import Convo from "./pages/Convo";

const SignUp = lazy(()=>import("./pages/SignUp"));
const SignIn = lazy(()=>import("./pages/SignIn"));
const Avatar = lazy(()=>import("./pages/Avatar"));
const Convo = lazy(()=>import("./pages/Convo"));
function App() {
  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<></>}>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/avatar" element={<Avatar/>} />
      <Route path="/" element={<Convo/>} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
