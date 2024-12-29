import { Outlet } from "react-router-dom";
import Headers from "./components/Header";
import { ToastContainer } from "react-toastify";

const App = () => {
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