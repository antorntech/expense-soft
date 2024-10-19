import React from "react";
import Header from "./components/shared/Header";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-0 md:py-5">
      <Header />
      <div className="p-3 md:p-0">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
