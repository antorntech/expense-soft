import React from "react";
import Header from "./components/shared/Header";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {user ? (
        <>
          <div className="max-w-screen-xl mx-auto py-0 md:py-5">
            <Header />
            <div className="p-3 md:p-0">
              <AppRoutes />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <AppRoutes />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
