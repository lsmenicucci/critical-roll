// import react
import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

// import theme variables
import theme from "./config/theme";

// import components
import StageComponent from "./components/Stage/index";
import Button from "./components/Buttons/Normal";

// import views
import DetailsView from "./views/Details";

// import styles
import "./styles/fonts.css";
import GlobalStyle from "./styles/global";

// import redux store
import store from "./redux/store";

const MainContainer = styled.div`
  background-color: ${theme.colors.purple};
  border-radius: ${theme.layout.borderRadius};
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
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

const MainMenu = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  width: 50%;
  height: 50%;
`;

const MenuButtonContainer = styled(Link)`
  width: 46%;
  height: 30%;
  margin: 5px;
`;

const MenuButtonComponent = styled(Button)`
  height: 100%;
  width: 100%;
`;

const MenuButton = ({ children, ...props }) => (
  <MenuButtonContainer {...props}>
    <MenuButtonComponent>{children}</MenuButtonComponent>
  </MenuButtonContainer>
);

const Stage = styled(StageComponent)`
  border-radius: ${theme.layout.borderRadius};
  height: 50%;
  width: 100%;
`;

const ActionCenter = styled.div`
  align-items: center;
  box-sizing: border-box;
  font-family: ${theme.font.family};
  height: 50%;
  display: flex;
  justify-content: center;
  width: 50%;
  padding: 8px;
`;

const ViewContainer = styled.div`
  width: 100%;
  height: 50%;
  box-sizing: border-box;
`;

export default () => {
  const [focusedChar, setFocusedChar] = useState(null);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <MainContainer>
          <PageDragHeader />
          <Switch>
            <Route path="/inventory">
              Não implementado :c
              <Link to="/">Voltar</Link>
            </Route>
            <Route path="/details">
              <ViewContainer>
                <DetailsView charId={focusedChar} />
              </ViewContainer>
            </Route>
            <Route path="/">
              <MainMenu>
                <MenuButton to="/inventory">Inventário</MenuButton>
                <MenuButton to="/details">Equipe</MenuButton>
                <MenuButton>Magias</MenuButton>
                <MenuButton>Histórico</MenuButton>
              </MainMenu>
              <ActionCenter>Não ta pegando nada por enquanto</ActionCenter>
            </Route>
          </Switch>

          <Stage onCharacterSelect={setFocusedChar}></Stage>
        </MainContainer>
      </Router>
    </Provider>
  );
};
