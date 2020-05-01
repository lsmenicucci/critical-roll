// import modules
import React from "react";
import { Provider } from "react-redux";

// import styles
import "./styles/global.scss";
import "./styles/typography.scss";

// import redux store
import setupStore from "./redux/store";

// import pages
import Main from "./pages/Main";

const App = () => {
  return (
    <Provider store={setupStore()}>
      <Main />
    </Provider>
  );
};

export default App;
