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
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
      notifyOnChangeProps: "tracked",
    },
  },
});

function App() {
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { isLoading, memberId } = userInfo;

  useEffect(() => {
    setUserInfo(1);
  }, []);

  if (isLoading) return null;
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
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
      </QueryClientProvider>
    </>
  );
}
export default App;
