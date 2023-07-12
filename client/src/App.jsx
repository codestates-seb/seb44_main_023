import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header/Header";
import TestWidget from "./pages/TestWidget"
import Sidebar from "./components/Sidbar/Sidbar";
import Test from "./pages/Test"


function App() {
  return (
    <>
      {/* <Header />
      <Sidebar /> */}
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
      </Routes>
    </>
  );
}
export default App;
