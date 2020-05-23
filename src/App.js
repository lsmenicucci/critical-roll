// import react
import React, { useState } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// import theme variables
import theme from "./config/theme";

// import components
import LoginPage from "./views/Login";
import CurrentAction from "./components/Roll/Feed";
import RollRequestView from "./components/Roll/Requester";
import RollView from "./components/Roll";
import StageComponent from "./components/Stage";
import NavbarComponent from "./components/Navigation/Tabs";

// import styles
import "./styles/fonts.css";
import GlobalStyle from "./styles/global";

const MainContainer = styled.div`
  background-color: ${theme.colors.purpleOne};
  border-radius: ${theme.layout.borderRadius};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
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
  border-radius: 0 0 ${theme.layout.borderRadius} ${theme.layout.borderRadius};
  width: 100%;
  flex: 1;
`;

const Navbar = styled(NavbarComponent)`
  border-radius: ${theme.layout.borderRadius} ${theme.layout.borderRadius} 0 0;
`;

const ViewContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
`;

export default () => {
  const [turn, session, characters] = useSelector((rootState) => [
    rootState.turn,
    rootState.session,
    rootState.characters,
  ]);

  const thisCharDices =
    turn &&
    turn.dices &&
    session &&
    turn.dices.filter((d) => d.forWho === session.charId);

  // set tab options
  const navOptions = [
    { children: "Inv", to: "/inventory" },
    { children: "ReqRoll", to: "/rollRequest" },
  ];
  if (thisCharDices && thisCharDices.length > 0) {
    navOptions.push({ children: "Roll", to: "/roll" });
  }
  return (
    <React.Fragment>
      <GlobalStyle />
      <PageDragHeader />
      <Router>
        <MainContainer>
          <Switch>
            <Route path="/login"></Route>
            <Route path="/">
              <Navbar options={navOptions} />
            </Route>
          </Switch>
          <ViewContainer>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/rollRequest">
                <RollRequestView />
              </Route>
              <Route path="/">
                <Stage
                  actionView={
                    <Switch>
                      <Route path="/inventory">
                        Não implementado :c
                        <Link to="/">Voltar</Link>
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
              </Route>
            </Switch>
          </ViewContainer>
        </MainContainer>
      </Router>
    </React.Fragment>
  );
};
