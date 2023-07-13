import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";

import TestWidget from "./pages/TestWidget"
import Sidebar from "./components/Sidebar/Sidebar";

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