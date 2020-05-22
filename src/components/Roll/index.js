// import rect modules
import React, { useState } from "react";
import styled from "styled-components";
import { useSpring } from "react-spring";

// import theme variables
import defaultTheme from "../../config/theme";

// import local components
import Button from "../Buttons/Normal";

const PageContainer = styled.div`
  align-items: center;
  background-color: ${defaultTheme.colors.red};
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const RollMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-family: ${defaultTheme.font.family};
  color: ${defaultTheme.colors.black};
`;

export default () => {
  const [hasAccepted, setAccepted] = useState(false);
  const [hasSubmited, setSubmited] = useState(false);

  return (
    <PageContainer>
      {!hasAccepted && (
        <React.Fragment>
          <RollMessage>
            <PageTitle>Voce tem rolagems a fazer!!</PageTitle>
            <Button onClick={() => setAccepted(true)}>Rolar!</Button>
          </RollMessage>
        </React.Fragment>
      )}
    </PageContainer>
  );
};
