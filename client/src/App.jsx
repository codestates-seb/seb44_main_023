import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import ProfilePage from "./pages/ProfilePage";
import TestWidget from "./pages/TestWidget";
import TestGroup from "./pages/TestGroup";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Main />} />    */}
        <Route path="/home" element={<Home />} />   
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
        <Route path="/group" element={<TestGroup />} />
        <Route path="*" element={<ErrorPage />} />   

      </Routes>
    </>
  );
}
export default App;
