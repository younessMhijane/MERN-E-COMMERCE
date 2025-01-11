import { Outlet } from "react-router-dom";
import Headers from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const App = () => {

useEffect(() => {
  AOS.init();
}, []);

  return (
    <>
      <ToastContainer />
      <Headers />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;