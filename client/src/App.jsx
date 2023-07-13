import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import TestWidget from "./pages/TestWidget";
import TestGroup from "./pages/TestGroup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
        <Route path="/group" element={<TestGroup />} />

      </Routes>
    </>
  );
}
export default App;
