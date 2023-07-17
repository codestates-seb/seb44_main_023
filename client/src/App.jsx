import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import TestWidget from "./pages/TestWidget";
import ErrorPage from "./pages/ErrorPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Main />} />    */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
        <Route path="/todo/:groupId" element={<TodoPage />} />
        <Route path="/login" element={<TodoPage />} />
        <Route path="/signup" element={<TodoPage />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </>
  );
}
export default App;
