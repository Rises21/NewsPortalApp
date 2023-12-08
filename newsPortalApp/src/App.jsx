import NavigationBar from "./components/NavigationBar";
import "./app.scss";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [authed, setAuthed] = useState("authedd");

  const changeAuth = () => {
    setAuthed("works!");
  };

  return (
    <>
      <header id="header" className="w-100">
        <NavigationBar />
      </header>
      <main id="main">
        <Outlet
          context={{
            userAuth: authed,
            cbAuth: changeAuth,
          }}
        />
      </main>
      <footer id="footer">
        <div className="container-fluid text-center bg-secondary py-3">
          <p className="mb-0">
            &#169; 2023 By Bangkit Setio R {import.meta.env.VITE_PORT}
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
