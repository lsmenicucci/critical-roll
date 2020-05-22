// import react modules
import React, { useState } from "react";
import styled from "styled-components";

// import theme variables
import theme from "../../config/theme";

const TabContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: ${theme.font};
`;

const TabsBar = styled.nav`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: flex-start;
`;

const TabItem = styled.div`
  cursor: pointer;
  background-color: ${({ selected }) =>
    (selected && theme.colors.red) || theme.colors.black};
  color: ${theme.colors.whiteOne};
  padding: 0.5rem 1rem;
  border-radius: ${theme.layout.borderRadius} ${theme.layout.borderRadius} 0 0;
  margin-right: 3px;
`;

const TabPageDisplay = styled.div`
  flex: 1;
`;

export default ({ options }) => {
  const [selectedOption, selectOption] = useState(
    Object.keys(options || {})[0]
  );

  const optionsArray = Object.entries(options || {});

  return (
    <TabContainer>
      <TabsBar>
        {optionsArray.map(([tabKey, tabData]) => {
          const { tabItem: TabItemContent } = tabData;
          return (
            <TabItem
              selected={tabKey === selectedOption}
              onClick={() => selectOption(tabKey)}
            >
              <TabItemContent />
            </TabItem>
          );
        })}
      </TabsBar>
      <TabPageDisplay>
        {options && options[selectedOption] && options[selectedOption].page}
      </TabPageDisplay>
    </TabContainer>
  );
};
