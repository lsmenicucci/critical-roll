// import react modules
import React from "react";
import styled from "styled-components";

// import local components
import LoginForm from "../components/Forms/LoginForm";
import Frame from "../components/Frame";

const LoginFrame = styled(Frame)`
  width: 100%;
  height: 100%;
`;

const FormWrap = styled.div`
  flex: 1;
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
`;

export default () => {
  return (
    <FormWrap>
      <LoginForm />
    </FormWrap>
  );
};
