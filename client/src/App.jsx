import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import TestWidget from "./pages/TestWidget";
import ErrorPage from "./pages/ErrorPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
        <Route path="/todo/:groupId" element={<TodoPage />} />
      </Routes>
    </>
  );
}
export default App;
