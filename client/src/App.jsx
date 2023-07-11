import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage"
import TestWidget from "./pages/TestWidget"

function App() {
  return (
    <>
      <Routes>
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/weatherWidget" element={<TestWidget />} />
      </Routes>
    </>
  );
}
export default App;
