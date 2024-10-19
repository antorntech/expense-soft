import React from "react";
import Header from "./components/shared/Header";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-5">
      <Header />
      <div>
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
