// import react modules
import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

// import theme variables
import theme from "../../config/theme";

// import tab button
import TabButton from "../Buttons/Tab";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  font-family: ${theme.font};
  padding: 8px;
`;

const TabsBar = styled.nav`
  display: flex;
  height: 30px;
  width: 100%;
  align-items: flex-start;
`;

const TabLink = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-right: 8px;
`;

export default ({ options }) => {
  const location = useLocation();

  return (
    <TabContainer>
      <TabsBar>
        {options &&
          options.map((props) => (
            <TabLink to={location.pathname === props.to ? "/" : props.to}>
              <TabButton selected={location.pathname === props.to} {...props} />
            </TabLink>
          ))}
      </TabsBar>
    </TabContainer>
  );
};
