import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
// import { Route } from "react-router-dom";
function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="App">
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="mynotes" element={<MyNotes search={search} />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="createnote" element={<CreateNote />} />
            <Route path="note/:id" element={<SingleNote />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
