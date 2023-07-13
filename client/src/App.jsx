import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import TestWidget from "./pages/TestWidget"
import Home from "./pages/Home"


function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="/" element={<Main />} />    */}
        <Route path="/home" element={<Home />} />   
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
        <Route path="*" element={<ErrorPage />} />   

      </Routes>
    </>
  );
}
export default App;
