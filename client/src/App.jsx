import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header/Header";
import TestWidget from "./pages/TestWidget"


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
      </Routes>
    </>
  );
}
export default App;
