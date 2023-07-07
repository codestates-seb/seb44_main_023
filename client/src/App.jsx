import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage"
import Test from "./pages/Test";

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
