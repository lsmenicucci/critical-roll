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
  background-color: ${theme.colors.whiteTwo};
  box-sizing: border-box;
  font-family: ${theme.font};
  flex-wrap: wrap;
  height: 46px;
  padding: 8px;
  width: 100%;
`;

const TabsBar = styled.nav`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: flex-start;
`;

const TabLink = styled(Link)`
  display: flex;
  text-decoration: none;
  margin-right: 8px;
  -webkit-user-select: none;
`;

export default ({ options, ...props }) => {
  const location = useLocation();

  return (
    <TabContainer {...props}>
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
