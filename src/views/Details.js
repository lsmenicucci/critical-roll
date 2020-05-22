// import react modules
import React from "react";
import styled from "styled-components";

// import local components
import Details from "../components/Character/Details";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export default ({ charId, ...props }) => {
  return (
    <Container {...props}>
      {charId ? (
        <Details charId={charId} />
      ) : (
        "Clique em um dos personagens para ver detalhes"
      )}
    </Container>
  );
};
