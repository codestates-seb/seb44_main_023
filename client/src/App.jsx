import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Test from "./pages/Test";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Test />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
