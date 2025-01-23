import { Outlet, useLocation } from "react-router-dom";
import Headers from "./components/Header";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import AOS from "aos";
import { AnimatePresence } from "framer-motion";
import "aos/dist/aos.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <ToastContainer />
      <Headers />
      <main>
        <AnimatePresence mode="wait">
          <Outlet location={location} key={location.pathname} />
        </AnimatePresence>
      </main>
    </>
  );
};

export default App;
