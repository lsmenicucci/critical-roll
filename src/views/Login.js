// import react modules
import React from "react";
import styled from "styled-components";

// import local components
import LoginForm from "../components/Forms/LoginForm";

// import theme
import theme from "../config/theme";

const LoginTitle = styled.h1`
  font-family: ${theme.font.family};
`;

const FormWrap = styled.div`
  flex-flow: column;
  flex: 1;
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

export default () => {
  return (
    <FormWrap>
      <LoginTitle>Critical Hit</LoginTitle>
      <LoginForm />
    </FormWrap>
  );
};
