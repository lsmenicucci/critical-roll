// import react modules
import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

// import local variables
import {
  colors as themeColors,
  layout as themeLayout,
} from "../../config/theme";

const ModalContainer = styled.div`
  position: fixed;
  display: ${({ visible }) => (visible === true ? "flex" : "none")};
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${rgba(themeColors.black, 0.7)};
  z-index: 3;
`;

const ModalFrame = styled.div`
  display: flex;
  padding: 0.5rem;
  background-color: ${themeColors.whiteOne};
  border-radius: ${themeLayout.borderRadius};
`;

const Modal = ({ children, visible }) => {
  return (
    <ModalContainer visible={visible}>
      <ModalFrame>{children}</ModalFrame>
    </ModalContainer>
  );
};

export default Modal;
