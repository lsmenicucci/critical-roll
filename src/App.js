// import react
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// import theme variables
import theme from "./config/theme";

// import components
import CurrentAction from "./components/Roll/Feed";
import RollView from "./components/Roll";
import StageComponent from "./components/Stage";
import Button from "./components/Buttons/Normal";
import TabButton from "./components/Buttons/Tab";

// import styles
import "./styles/fonts.css";
import GlobalStyle from "./styles/global";

const MainContainer = styled.div`
  background-color: ${theme.colors.purpleOne};
  border-radius: ${theme.layout.borderRadius};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100vw;
  height: 100%;
`;

const PageDragHeader = styled.div`
  position: absolute;
  cursor: hand;
  top: 0;
  width: 100%;
  height: 15px;

  -webkit-app-region: drag;
`;

const Stage = styled(StageComponent)`
  border-radius: ${theme.layout.borderRadius};
  width: 100%;
  height: 100%;
`;

const ViewContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 16px;
`;

export default () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <MainContainer>
          <PageDragHeader />
          <Stage
            actionView={
              <Switch>
                <Route path="/inventory">
                  Não implementado :c
                  <Link to="/">Voltar</Link>
                </Route>
                <Route path="/details">
                  <ViewContainer></ViewContainer>
                </Route>
                <Route path="/roll">
                  <ViewContainer>
                    <RollView />
                  </ViewContainer>
                </Route>
                <Route path="/">
                  <ViewContainer>
                    <CurrentAction />
                  </ViewContainer>
                </Route>
              </Switch>
            }
          />
        </MainContainer>
      </Router>
    </React.Fragment>
  );
};
