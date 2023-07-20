import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import TodoPage from "./pages/TodoPage";
import MainPage from "./pages/MainPage";
import LedgerPage from "./pages/LedgerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import useUserInfoStore from "./store/store.userInfo";
import Layout from "./Layout/PagesLayout";

function App() {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { isLoading, memberId } = userInfo;

  useEffect(() => {
    setUserInfo(1);
  }, []);

  if (isLoading) return null;
  return (
    <>
      {memberId ? (
        <Layout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/todo/:groupId" element={<TodoPage />} />
            <Route path="/ledger/:groupId" element={<LedgerPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      )}
    </>
  );
}
export default App;
