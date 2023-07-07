import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage"
import Test from "./pages/Test"
import Home from "./pages/Home"


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />   
        <Route path="*" element={<Test />} />
        <Route path="*" element={<ErrorPage />} />   
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
