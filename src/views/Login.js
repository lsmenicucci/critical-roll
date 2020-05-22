// import react modules
import React from "react";
import styled from "styled-components";

// import frame specs
import { login as loginWindowData } from "../shared/frames";

// import local components
import LoginForm from "../components/Card/LoginForm";
import Frame from "../components/Frame";

const LoginFrame = styled(Frame)`
  width: ${`${loginWindowData.width}px`};
  height: ${`${loginWindowData.height}px`};
`;

const FormWrap = styled.div`
  flex: 1;
  display: flex;
  padding: 0.5rem;
  align-items: flex-start;
`;

export default () => {
  document.title = loginWindowData.title;
  return (
    <LoginFrame title="O inicio da jornada" dragabble>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </LoginFrame>
  );
};
