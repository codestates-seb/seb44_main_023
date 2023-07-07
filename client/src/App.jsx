import { Route, Routes } from "react-router-dom";
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
      </Routes>
    </>
  );
}

export default App;
