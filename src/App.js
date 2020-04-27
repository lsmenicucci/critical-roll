// import modules
import React from "react";
import { Provider } from "react-redux";

// import styles
import "./styles/global.scss";
import "./styles/typography.scss";

// import redux store
import setupStore from "./redux/store";

// import pages
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <Provider store={setupStore()}>
      <DashboardPage />
    </Provider>
  );
}

export default App;
